import Vue from 'vue';
export function MP() {
    return new Promise(function (resolve, reject) {
        let ak = 'AH2cr1tXc1hozCUdb3N0VXTYWyUwSXGr&s=1';
        //let ak = 'QIGfGNcK1xGCZd09uV17GuK6SiquEiGB';

        if(process.env.NODE_ENV == 'test'){
            ak = 'QIGfGNcK1xGCZd09uV17GuK6SiquEiGB';
        }
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=init`;
        script.onerror = reject;
        document.head.appendChild(script);
        script.onload = function () {
            Vue.prototype.BMap = BMap;
            resolve(BMap)
        }
    })
}