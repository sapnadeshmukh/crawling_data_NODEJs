const puppeteer = require('puppeteer');
const express=require("express")
const app=express()


app.get("/",(req,res)=>{


    (async () => {
        let url = 'https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3'

        let browser = await puppeteer.launch();
        let page = await browser.newPage();

        await page.goto(url,{waitUntil:'networkidle2',timeout:0});

        let data = await page.evaluate(()=>{

            let reviewComment = document.querySelector('div[class="rightCol"] p').innerText;
            // let rating = document.querySelector('div[class ="itemRating"] strong').innerText;
            let ReviewDate = document.querySelector('.reviewer').innerText;

            const arr=[];
            let date=[];
            for( i in ReviewDate){
                date.push(ReviewDate[i])
            }
            let x = date.slice(-13,-1)
            arr.push(x)
            let dateReview = arr.join()
            let reviewDate = ''
            for(i in dateReview){
                
                if (dateReview[i] == ','){
                    continue
                }
                else{
                    reviewDate += dateReview[i]
                }

            }
            let reviewName = document.querySelector('dl[class="reviewer"] > dd').innerText ;
            let rating = document.querySelector('dl[class ="itemReview"] > dd').innerText;

            const arrRating=[];
            let dateRating=[];
            for( i in rating){
                dateRating.push(rating[i])
            }
            let y = dateRating.slice(-4,-1)
            arrRating.push(y)
            let dateReview1 = arrRating.join()
            let Rating = ''
            for(i in dateReview1){
                
                if (dateReview1[i] == ','){
                    continue
                }
                else{
                    Rating += dateReview1[i]
                }

            }

            return{
                reviewName,reviewComment,reviewDate, Rating
            
            }

        })
        console.log(data)
        res.send(data)



        await browser.close()
    })();
    });

app.listen(4000,()=>{
    console.log("server is running on port 4000")

}) 
