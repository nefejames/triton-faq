


async function PostWithAuth(route, data) {

    const authUser = JSON.parse(localStorage["_authuser"]);
    const token =  authUser ? authUser.userData.token : "";

    return fetch(`https://team-trion.herokuapp.com${route}`,{
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        body: JSON.stringify(data)
    });
}

async function getWithAuth(route) {

    const authUser = JSON.parse(localStorage["_authuser"]);
    const token =  authUser ? authUser.userData.token : "";

    return fetch(`https://team-trion.herokuapp.com${route}`,{
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        }
    });
}

async function signIn({ username, password }){
    return new Promise(async (resolve)=>{
        try{
            const response = await fetch("https://team-trion.herokuapp.com/login/",{
                    method: 'POST', 
                    mode: 'cors', 
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username,
                      password
                    })
                  });
                let { status } = response;
                const data = await response.json();
    
                if(status === 201 || status === 200 ){
                    const { token } = data;
                    const payload = {
                        isLoggedIn:true,
                        userData:{
                            username,
                            token
                        }
                    }
                    resolve(payload);
                }
            } catch (error) {
                
            }
    })
}

export{
    PostWithAuth,
    getWithAuth,
    signIn
} 
