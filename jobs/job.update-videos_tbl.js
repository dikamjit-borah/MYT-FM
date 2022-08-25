const TAG = "job.update-videos_tbl"
const cron = require('node-cron')

module.exports = {
    //todo update db every long interval instead of after every api call
    updateVideosInDb: function(){
        const cronEveryMinute = "* * * * *"
        const cronEveryHour =  "0 0 */2 * * *"
        cron.schedule(cronEveryMinute, ()=>{
            console.log(TAG, `Updating videos_tbl`);
        })
    }
}