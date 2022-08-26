# MYT-FM

## About
Node.js application that will call **/youtube/v3/search api** after a set interval and update the latest videos in a MySQL database

## Project Structure
The project is divided into separate modules for separation of concerns, code cleanliness and ease in debugging

## Functionality
On starting the node.js application, an *express* server will start and listen on port 8081. It starts a *setInterval* function which runs every 5 mins (this can be configured in the *_config.js*). The callback for this setInterval function is comprised of 2 main tasks. It first calls */youtube/v3/search api* with an *axios* instance. Upon receiving the response, the data in the response is parsed into an array of objects and stored in *videoData*. Secondly, this videoData is then converted into array of values for bulk insertion into the *videos_tbl* table with a map function inside *updateVideosInDb* function. A *sequelize* instance is used to connect to our database and a raw query is used to perform the bulk insert. 

Currently, the app has 3 valid google cloud api keys for accessing the youtube data v3 api stored as *env* variable and accessed via an array in the _config file. The 0th element of the *apiKeys.googleCloud array* is stored in *global* object as *googleCloudApiKeyIndex*. On making axios call if 403 error is faced, the next available key in the apiKeys.googleCloud is set in the global googleCloudApiKeyIndex. 

## Endpoints
The application has 2 necessary endpoints

### A basic search API to search the stored videos using their title and description.

**GET** /api/v1/video/search HTTP/1.1
**PARAMS** searchParam
**Host** localhost:8081

#### example call & response
```
http://localhost:8081/api/v1/video/search?searchParam=funny
```

```
{
    "statusCode": 200,
    "message": "Search successful",
    "data": [
        {
            "video_id": "_QOVFPESnWk",
            "title": "cute cat videos 😽 funny videos 😻😽",
            "description": "",
            "publish_time": "2022-08-26T09:08:52.000Z"
        },
        {
            "video_id": "_xaEHSCS6kU",
            "title": "Cute dog videos2022 ||Cat videos YouTube||Cute cat funny| #cat #funny #cuteness #shorts #short #cute",
            "description": "",
            "publish_time": "2022-08-26T03:06:48.000Z"
        }
    ]
}
```

### A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.

**GET** /api/v1/video/all HTTP/1.1
**PARAMS** page, limit
**Host** localhost:8081
