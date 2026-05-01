import { useState } from "react";

export const Error = ({ cb, open }) => {

    return <>
        <div
            className={`${open ? 'fixed' : 'hidden'} w-100 h-20 bg-amber-50`}
        >
            Yeah that aint 5 letters buddy
            <button className="cursor-pointer text-blue-500" onClick={cb}>Try again</button>
        </div>
    </>
};