    res.send(`
               <!DOCTYPE html>

<html>

<head>
    <title>SmellCheckMate ChatBot</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <style>
        body,
        h1 {
            font - family: "Raleway", sans-serif
        }

        body,
        html {
            height: 100%
        }

        .bgimg {
            background: url('https://i.imgur.com/oee9rXL.png');
            min-height: 100%;

            background-repeat: repeat;
            object-fit: contain;
        }

        .lbl {
            font - family: 'Cairo', sans-serif;
            font-weight: 500;
            /* High weight for bold text */
            font-size: 2.0em;
            color: white;
            background: linear-gradient(to right, rgba(0, 4, 40, 1), rgba(0, 78, 146, 1));
            /* Dark blue gradient with 50% transparency */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            padding: 10px;

        }

        .lbl1 {
            font - family: 'Cairo', sans-serif;
            font-weight: 400;
            /* High weight for bold text */
            font-size: 1.5em;
            color: white;
            background: linear-gradient(to right, rgba(0, 4, 40, 1), rgba(0, 78, 146, 1));
            /* Dark blue gradient with 50% transparency */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            padding: 10px;

        }
    </style>
</head>

<body>

    <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
        <div class="w3-display-topleft w3-padding-large w3-xlarge">
            SmellCheckMate ChatBot
        </div>
        <div id='content' class="w3-display-middle">
            <center>
                <h2 class=" lbl w3-jumbo w3-animate-top">QRCode Generated</h2>

                <hr class="w3-border-grey" style="margin:auto;width:40%">
                <p class="w3-center">
                <div><img src=${src} /></div>
                </p>
            </center>
        </div>
        <div class="w3-display-bottomleft w3-padding-large">
            Powered by <a class="lbl1" href="" target="_blank">DigistacksAI</a>
        </div>
    </div>
 
</body>

</html>   
                            `

    );
