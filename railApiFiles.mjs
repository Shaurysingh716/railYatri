export var trainDataArray = [];
export var fromTimeArray = [];
export var toTimeArray = [];
export var fromStationName = [];
export var toStationName = [];

// let boardingStation = document.getElementById('boardingStation');
// let destinationStation = document.getElementById('destinationStation');
export default async function railData(){
    try{
        let promise = await fetch(`https://indian-railway-api.cyclic.app/trains/betweenStations/?from=MTJ&to=JP`,{
            method: 'GET',
            redirect: 'follow'
        })
        let JSONData = await promise.json();
        // console.log(JSONData['data']);
        let JSONDataArray = JSONData['data'];
        for (let i=0; i<JSONDataArray.length; i++){
            let trainBaseData = JSONData['data'][i];
            trainDataArray[i] = trainBaseData['train_base']['train_no'] + " " + trainBaseData['train_base']['train_name'];
            toTimeArray[i] = "22 OCT | " + trainBaseData['train_base']['to_time'];
            fromTimeArray[i] = "23 OCT | " + trainBaseData['train_base']['from_time'];
            fromStationName[i] = trainBaseData['train_base']['from_stn_name'];
            toStationName[i] = trainBaseData['train_base']['to_stn_name'];
        }
        console.log(trainDataArray)
        console.log(toTimeArray)
        console.log(fromTimeArray)
        console.log(fromStationName)
        console.log(toStationName)
        return trainDataArray, toTimeArray, fromTimeArray, toStationName, fromStationName;
    }catch(error) {
        console.log(error);
    }
}

railData();