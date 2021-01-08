const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

let tiktokUrl = 'https://m.tiktok.com/v/6914497188911402246.html?_d=secCgYIASAHKAESMgowiPd2K85b6aYS9m0ICucNV8tiVDBNTnh494VNyu3pyxWtcURweRXsiKA7o3gKTaDVGgA%3D&language=en&preview_pb=0&sec_user_id=MS4wLjABAAAA7w63G45TWTQM9wxtDfGWpb5G3jis5kNf31BDpC9bntQR4df4n8BJc-kchOEzkqXI&share_item_id=6914497188911402246&share_link_id=8EE7C92D-8E55-4F5A-B39D-5A8CE7A383E3&timestamp=1609976437&tt_from=copy&u_code=dbgfc1h9lc0h61&user_id=6809421679216935941&utm_campaign=client_share&utm_medium=ios&utm_source=copy'
let headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    'Referer': "https://www.tiktok.com/",
}
let actualUrl = 'https://www.tiktok.com/@sleeppiijuice/video/6914497188911402246?_d=secCgYIASAHKAESMgowiPd2K85b6aYS9m0ICucNV8tiVDBNTnh494VNyu3pyxWtcURweRXsiKA7o3gKTaDVGgA%3D&language=en&preview_pb=0&sec_user_id=MS4wLjABAAAA7w63G45TWTQM9wxtDfGWpb5G3jis5kNf31BDpC9bntQR4df4n8BJc-kchOEzkqXI&share_item_id=6914497188911402246&share_link_id=8EE7C92D-8E55-4F5A-B39D-5A8CE7A383E3&timestamp=1609976437&tt_from=copy&u_code=dbgfc1h9lc0h61&user_id=6809421679216935941&utm_campaign=client_share&utm_medium=ios&utm_source=copy&source=h5_m'
let shared = 'https://vm.tiktok.com/ZMJWsLbEs'
let a = 'https://m.tiktok.com/api/item/detail/?agent_user=&itemId=6914497188911402246'

// Make a request for a user with a given ID
function findRedirectUrl(url) {
    axios.get(url, { headers })
    .then(function (response) {
      console.log(response.request.res.responseUrl);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

// findRedirectUrl(shared);

axios.get(actualUrl, { headers } )
.then(function (response) {
    console.log(typeof response.data)
    let $ = cheerio.load(response.data);
    fs.writeFile()
//   console.log(response);
//   console.log(response.request.res.responseUrl);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});