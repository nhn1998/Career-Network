import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Review.css"
import { EffectCoverflow, Pagination } from "swiper";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { useCommentQuery } from "../../../app/SomeApi/taskApi";
import GetLoading from "../../../components/Loading/GetLoading";
import { AuthContext } from "../../../Context/AuthProvider";

export default function App() {

    const {user}=useContext(AuthContext)

   
    const {data:comments=[],isLoading,isFetching,isSuccess,isError,error}=useCommentQuery()
    if(isLoading || isFetching){
        return <div className="grid place-items-center h-80">
            <GetLoading></GetLoading>
        </div>
    }
    if(isError){
        return <p>{error.status}</p>
    }
    // console.log(comments)

    if(isError){
        return <p>{error.status}</p>
    }

  return (
    <div className="relative h-full m-0 px-0 pt-14 pb-10 bg-home ">
        <div>
            <div className="text-center">
                <h2 className="text-4xl text-sky-800 font-semibold">Testimonials</h2>
                <p>Some user reviews about the website</p>
            </div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {isSuccess && comments?.map((item)=> <SwiperSlide>
                    <div className="block w-full h-full cursor-pointer px-6 bg-testimonial shadow-md hover:shadow-inner hover:shadow-slate-800 shadow-slate-400 transition-shadow duration-300 capitalize rounded-tl-3xl rounded-br-3xl">
                        <div className="flex flex-col justify-evenly h-full items-start">
                            <div className="flex justify-between items-center w-full">
                                <h2 className="text-2xl font-semibold capitalize text-sky-700">{item?.title}</h2>
                                <div className="flex items-center gap-4 text-2xl">
                                    <a href="https://www.facebook.com/NHN1998/" target="_blank"><BsFacebook className="text-sky-800"></BsFacebook></a>
                                    <BsGithub><a href={item?.github} target="_blank"></a></BsGithub>
                                    <AiFillLinkedin className="text-sky-800"><a href={item?.linkdin} target="_blank"></a></AiFillLinkedin>
                                </div>
                            </div>
                            <p>{item?.dialog}</p>
                            <div className="flex gap-3 items-center justify-start">
                                <img className="h-10 w-10 rounded-full bg-black" src="https://ibb.co/tLfdmJS" alt="img" />
                                <div>
                                    <h4>Md. Nur Hossain</h4>
                                    <p className="uppercase">{item?.usertitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    </div>
  );
}
