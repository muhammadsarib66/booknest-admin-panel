/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/gofflogo.svg"

import {
  CardHeader,
} from "@material-tailwind/react";

const Header = ({
  setStatusTab,
  statusTabs,
  heading,
  setSearch,
  StatusTabVal,
  placeHolder,
  btnTitle,
  handleBtnFunction
}: any) => {
  const handleTabChange = (value: any) => {
    setStatusTab(value);
    console.log(value,'sss')
  }
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="font-Poppins  rounded-none"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <div className="mb-8 flex items-center justify-between gap-8">
        <div className="flex items-center  w-full gap-3">
          <div>
            <img src={Logo} alt="eventLogo" className="w-20 h-20" />
            </div>
          <h2
        className="text-primary font-semibold text-3xl"
        >
            {heading}
          </h2>

        </div>
      </div>
      <div className="flex flex-col  items-center justify-center gap-4 md:flex-row">
     {statusTabs && 
       <div className="relative inline-block w-[20%]">
      <select
        value={StatusTabVal ?? "all"}
        onChange={(e) => handleTabChange(e.target.value)}
        className="block  h-10 appearance-none w-full bg-primary border  border-primary text-white py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-primary focus:border-primary"
      >
        {statusTabs?.map(({ title, value }:any) => (
          <option style={{background: "white", color:'black',border:'none'}} key={value} value={value}>{title}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
    }
        <div className="w-[80%]">
          <div className="rounded-full h-12 grid grid-cols-12 border-[1px] border-[CCCCCC] place-items-center ">
          
          <SearchIcon className="col-span-1 h-5 w-5" />
          <input className="col-span-9 w-full outline-none   py-2 px-4 pr-8  rounded-lg leading-tight " type="text" placeholder={placeHolder} onChange={(e) => setSearch(e.target.value)} />
          <div 
          onClick={handleBtnFunction}
          className="cursor-pointer w-full h-full flex rounded-r-full items-center justify-center
          bg-primary border border-primary text-white 
          col-span-2
          ">

{btnTitle}
          </div>
          </div>
       
        </div>
      </div>
    </CardHeader>
  );
};

export default Header;
