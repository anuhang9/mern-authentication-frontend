import { Check, X } from "lucide-react";

interface PasswordStrenghtMeterProps{
    password: string
}

const PasswordCriteria =({password}: PasswordStrenghtMeterProps)=>{
    const criteria = [
        {label: "At leas 8 character", met: password.length >= 8},
        {label: "Containes uppercase letter", met: /[A-Z]/.test(password)},
        {label: "Containes lowercase letter", met: /[a-z]/.test(password)},
        {label: "Contains a number", met: /[\d]/.test(password)},
        {label: "Contains special character", met: /[^A-Za-z0-9]/.test(password)}
    ];
    return(
        <div className="mt-2 space-y-1">
            {criteria.map((item)=>(
                <div key={item.label} className="flex items-center text-xs">{item.met ? <Check className="size-4 text-blue-500 mr-2"/> : <X className="size-4 text-gray-500 mr-2"/>}<span className={item.met ? "text-blue-500": "text-gray-400"}>{item.label}</span></div>
            ))}
        </div>
    )
}

export const PasswordStrenghtMeter =({password}: PasswordStrenghtMeterProps)=>{
    const getStrength =(pass: string)=>{
        let strenght = 0;
        if(pass.length >=8)strenght++;
        if(pass.match(/[a-z]/) && pass.match(/[A-Z]/))strenght ++;
        if(pass.match(/[\d]/))strenght++;
        if(pass.match(/[^a-zA-Z\d]/)) strenght++;
        return strenght;
    }
    const strenght = getStrength(password);

    const getColor =(strenght: number)=>{
        if(strenght === 0) return "bg-red-300";
        if(strenght === 1) return "bg-red-500";
        if(strenght === 2) return "bg-yellow-300";
        if(strenght === 3) return "bg-yellow-500";
        return "bg-blue-500";
    }
    
    const getStrengthText =(strenght: number)=>{
        if(strenght === 0) return "very weak";
        if(strenght === 1) return "weak";
        if(strenght === 2) return "fair";
        if(strenght === 3) return "good";
        return "strong";
    }
    return(
        <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
                <span className="xs text-gray-400">Password Strenght</span>
                <span className="xs text-gray-400">{getStrengthText(strenght)}</span>
            </div>
            <div className="flex space-x-1">
                {
                    [...Array(4)].map((_, index)=>(
                        <div key={index}
                        className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index< strenght ? getColor(strenght): "bg-gray-600"}`}/>
                    ))
                }
            </div>
            <PasswordCriteria password={password}/>
        </div>
    )
}