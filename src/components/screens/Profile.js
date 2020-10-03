import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
  const [myPics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then((result) => {
      setPics(result.mypost);
    })
  }, [])

  useEffect(() => {
    if(image) {
      setImage(image)
    }
  }, [image])

  const updateProfilePic = (file) => {
    setImage(file);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "kannu21");
    fetch("https://api.cloudinary.com/v1_1/kannu21/image/upload", {
      method: "post",
      body:  data
    })
    .then((res) => res.json())
    .then((data) => {
      setUrl(data.url);
      localStorage.setItem('user', JSON.stringify({...state, pic: data.url }))
      dispatch({ type: 'UPDATEPIC', payload: data.url})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div style={{maxWidth:"550px", margin: "0px auto"}}>
      <div style={{ 
        margin: "18px 0px",
        borderBottom: "1px solid grey"}}>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
        }}>
          <div>
            <img alt="" style={{width:"160px", height:"160px", borderRadius: "80px"}}
              src={state?state.pic: ""}
            />
          </div>
          <div>
            <h4>{state? state.name : 'loading...'}</h4>
            <h5>{state? state.email : 'loading...'}</h5>
            <div style={{display: "flex", justifyContent: "space-between", width: "108%"}}>
              <h6>{myPics.length} posts</h6>
              <h6>{state && state.followers ?state.followers.length:0} followers</h6>
              <h6>{state && state.following ?state.following.length:0} following</h6>
            </div>
          </div>
        </div> 
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
          style={{ margin: '10px 0px 10px 52px'}}
          onClick={() => updateProfilePic()}
        >Update pic</button>
        <div className="file-field input-field" style={{ margin: '10px'}}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update pic</span>
            <input type="file" onChange={(e) => updateProfilePic(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {
          myPics.map((item) => {
            return (
              <img key={item._id} className="item" alt={item.title} src={item.photo} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Profile;