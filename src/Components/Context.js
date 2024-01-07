import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext);
  }
  export function AuthProvider({ children }) {
    const [apiSearch, setApiSearchData] = useState([]);
    const [puId, setpuId] = useState(null);
    const [flag, setflag] = useState(false);
  
  
    return (
      <AuthContext.Provider value={{setApiSearchData,apiSearch,puId, setpuId,flag,setflag }}>
        {children}
      </AuthContext.Provider>
    );
  }






   
  