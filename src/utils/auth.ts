function logout(){
  sessionStorage.removeItem("_token");
}

function decodeJwt(token:string | null){
  if(!token) return ""
  const user = decodeURIComponent(window.atob(token.split('.')[1]));
  return JSON.parse(user)
}

export {
  logout, decodeJwt
}