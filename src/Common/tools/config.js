/**
 * Created by DELL on 2018/3/27.
 */
let protocol = window.location.protocol;
let apiUrl = 'http://holer.org:65115';
//let apiUrl = 'http://merchant.hifleet.com:71/IntratradeSystem';
let imgServerUrl = 'http://test.hifleet.com:8082';
//let imgServerUrl = 'http://merchant.hifleet.com:8082';
/* test config*/
if (process.env.kingold == 'test') {
    apiUrl = `http://test.hifleet.com:71/IntratradeSystem`;
    //apiUrl = `http://merchant.hifleet.com:71/IntratradeSystem`;
}
/* prod config*/
if (process.env.kingold == 'production') {
    apiUrl = `${protocol}//issuer-pc-prod.zj-hf.cn`;
}
export default {
    apiUrl,
    imgServerUrl
}

