import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { LuLockKeyhole } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMoney } from "react-icons/md";


interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  footText?: string;
  isInputPassword?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder,
  className,
  disabled = false,
  footText = "",
  isInputPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getIcon = () => {
    switch (name) {
      case "name":
        return <FaUser className="text-slate-400" />;
      case "email":
        return <MdAlternateEmail className="text-slate-400" />;
      case "password":
        return <LuLockKeyhole className="text-slate-400" />;
      case "first_name":
        return <FaRegUser className="text-slate-400" />;
      case "last_name":
        return <FaRegUser className="text-slate-400" />;
        case "top_up_amount":
          return <MdOutlineMoney className="text-slate-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-5 w-full">
      <label htmlFor={name} className="block text-sm font-bold text-gray-700">
        {label}{" "}
        {required && label && <span className="text-primary text-xs">*</span>}
      </label>
      <div className="relative">
        <input
          type={isInputPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-3 py-2 pl-9 border border-gray-200 rounded-md focus:outline-none text-sm focus:ring-red-500 text-gray-700 focus:border-red-500 sm:text-sm border-input ${
            disabled ? "bg-gray-200" : "bg-background"
          }  dark:bg-white ring-offset-background placeholder:text-gray-400 ${className}`}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          {...props}
        />

        <div className="absolute inset-y-0 left-3 top-3">{getIcon()}</div>

        {isInputPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
        )}
      </div>
      {footText && (
        <span className="text-[10px] text-gray-400 italic">{footText}</span>
      )}
    </div>
  );
};

export default FormInput;
