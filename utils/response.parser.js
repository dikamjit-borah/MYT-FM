module.exports = {
    parseV3searchApi: function (result) {
        let videoData = []
        if (result) {
            if (result.items && Array.isArray(result.items)) {
                let items = result.items
                items.forEach(element => {
                    videoId = element.id && element.id.videoId ? element.id.videoId : ""
                    if (videoId && element.snippet) {
                        let snippet = element.snippet
                        let title = snippet.title ? snippet.title : ""
                        let description = snippet.description ? snippet.description : ""
                        let publishedAt = snippet.publishedAt ? snippet.publishedAt : ""

                        videoData.push({
                            videoId,
                            title,
                            description,
                            publishedAt
                        })
                    }
                });
            }
        }
        return videoData
    }
}