const whiteList = ['http://localhost:5173', 'http://localhost:5000']
const corOptions = {
    origin: (origin, callback) => {
         if(whiteList.indexOf(origin) !== -1){
             callback(null, true)
         } else {
            callback(new Error('Not allowed by CORS'))
         }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corOptions
