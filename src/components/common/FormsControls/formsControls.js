import React from "react";
import s from './formsControls.module.css'


export const FormControl = ({meta: {touched, error}, children}) => {   //делаем деструктуризацию с помощью rest-оператора

    const hasError = touched && error;                       //в textarea есть meta.touched и meta.error

    return (
        <div className={s.form + ' ' + (hasError ? s.error : '')}>
           {children}
           { hasError && <span>{error}</span> }
        </div>
    )
}

export const Textarea = (props) => {    
    const {input, meta, child, ...restProps} = props;    
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>   
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;    
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>    
}