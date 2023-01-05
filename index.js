const N = 30;

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  }

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function makepin() {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function create_account(email) {
    let body = "{\"email\":\""+email+"@thedrinkmarket.fr\",\"password\":\""+makepin()+"\",\"name\":\""+makeid(5)+"\"}";
    console.log(body);
    fetchWithTimeout("https://boursofoy.centralelilleprojets.fr/api/user/register/", {
        timeout: 6000,
        "headers": {
          "accept": "application/json",
          "accept-language": "de-DE,de;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
          "authorization": "null",
          "content-type": "application/json",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "csrftoken=hIdIcX9Ck7fawWGe1CFmISrN9NweXJzR",
          "Referer": "https://boursofoy.centralelilleprojets.fr/register",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": body,
        "method": "POST"
      }).then((response) => {
          if (response.status >= 500) {
              console.log("Error server: " + response.status);
          } else if (response.status == 201) {
            console.log("Account created successfully");
          } else {
            console.log("Error status: " + response.status);
          }
      }).catch((err) => {
        console.log("Client timeout.")
      });
}
for (i = 0; i < N; i++){
    create_account(makeid(10));
}