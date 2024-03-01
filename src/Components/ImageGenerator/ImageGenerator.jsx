import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import defaultImage from '../Assets/image.jpg'

export const ImageGenerator = () => {

    const [imageUrl,setImageUrl] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const ImageGenerator = async () => {
        if(inputRef.current.value === ""){
            return 0;
        }

        setLoading(true);

        const responce = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );

        let data = await responce.json();
        
        let dataArray = data.data;

        setImageUrl(dataArray[0].url);

        setLoading(false);
    }

    
  return (
    <div className='aiImgGen'>
        <div className="header">AI Image <span>Generator</span></div>
        <div className='imgloading'>
            <div className="image"><img src={imageUrl==="/" ? defaultImage : imageUrl} alt="" /></div>
            <div className="loading">
                <div className={loading ? "loadingBar-full" : "loadingBar"}></div>
                <div className={loading ? "loadingtext-show" : "loadingtext-hide"}>Loading....</div>
            </div>
        </div>
        <div className='searchBox'>
            <input type="text" ref={inputRef} className="searchInput" placeholder='Describe What You need'/>
            <div className="generateBtn" onClick={()=> {ImageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator