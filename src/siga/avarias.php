<!DOCTYPE html>
<html>
<head>
    <title>Relatório Avarias</title>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        
        .iframe-wrapper {
            position: relative;
            padding-top: 45%; /* Proporção de 16:9 (dividindo a altura pelo width e multiplicando por 100) */
            width: 100%;
        }
        
        .iframe-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="iframe-wrapper">
            <?php
                $iframeSrc = 'https://app.powerbi.com/view?r=eyJrIjoiZTgwNGExYjktMmYyMS00MTAwLTkyMjMtZGIyYTg2ZjIzMGI0IiwidCI6ImU3NjBjMDhiLTRlOWItNDVmMC1hY2E2LWRjYTBlMjhmYmE5NCJ9';
            ?>

            <iframe title="Relatório Avarias" src="<?php echo $iframeSrc; ?>" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    </div>
</body>
</html>
