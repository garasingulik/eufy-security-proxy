# Eufy Security API Proxy

This proxy build from ground up without official API documentation from Eufy Security camera. The proxy has a very limited implementation and the main focus is to get the video stream from the Eufy Security camera it self.

The documentation provided how to access the RTSP stream from local devices but it's limited to recording duration and we can't activate the devices without triggering the motion sensors. Getting continuous stream url is possible using Eufy Security app and from Web Dashboard.

In that scenario, using this API Proxy allows us to activate the camera remotely and get the RTMP stream url from the list of devices that we registered. Again, as I mentioned in the beginning the implementation is very limited. Feel free to improve this project and make a PR. :-)

# Running in Development

Clone this repository and run:
```
npm install
```

Before we run the project, create one `.env` file in the root of the project and configure this value:
```
API_HOST=<eufy api url>
API_USERNAME=<your eufy login email>
API_PASSWORD=<your eufy password>
```

To run this project in the development:
```
npm run dev
```
The development server will run at `http://localhost:3000`

# Testing Endpoints

### Get Device List

```
curl -L -X GET http://localhost:3000/devices
```

Example response:
```
[{"device_id":0123456789,"device_name":"C1","device_model":"T8113","device_sn":"***","station_sn":"***","main_hw_version":"eufy2_mini","main_sw_version":"1.6.7","sec_hw_version":"P0","sec_sw_version":"1.0.70-20200706","wifi_mac":"AA:BB:CC:DD:EE:FF"},{"device_id":0123456789,"device_name":"C2","device_model":"T8113","device_sn":"***","station_sn":"***","main_hw_version":"eufy2_mini","main_sw_version":"1.6.7","sec_hw_version":"P0","sec_sw_version":"1.0.70-20200706","wifi_mac":"AA:BB:CC:DD:EE:FF"}]
```

### Get Stream URL

```
curl -L -X POST 'http://localhost:3000/stream/start' -H 'Content-Type: application/json' -d '{ "device_id": 0123456789, "device_sn": "***", "station_sn": "***" }'
```

Example response:
```
{"url":"rtmp://p2p-vir-6.eufylife.com/hls/*****?time=*****&token=*****"}
```

### Stop Stream

```
curl -L -X POST 'http://localhost:3000/stream/stop' -H 'Content-Type: application/json' -d '{ "device_id": 0123456789, "device_sn": "***", "station_sn": "***" }'
```

Example response:
```
{"message":"OK"}
```
