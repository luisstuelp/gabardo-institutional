<?php
	session_start();
	
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	
	$msg="";
	
	$con = mysqli_connect("191.6.138.226", "rastro", "gabardo", "rastro", 3306);

	// Check connection
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	// Inicializa variáveis
	$cte = isset($_POST['cte']) ? $_POST['cte'] : "";
	$result = null;
	
	// Logout
	if (isset($_POST['op']) && $_POST['op'] == "sair") {
		$_SESSION["dn"] = "";
		session_destroy();
	}

	// Login
	if (isset($_POST['dn']) && $_POST['dn'] != "") {
		
		// Prepared statement para evitar SQL Injection
		$stmt = $con->prepare("SELECT * FROM VIEW_SIGA_CONSULTATRANSPORTE WHERE LOGIN_DN = ? OR DN = ?");
		
		if ($stmt) {
			$dn = $_POST['dn'];
			$stmt->bind_param("ss", $dn, $dn);
			$stmt->execute();
			$result = $stmt->get_result();
			
			if ($result->num_rows > 0) {
				$_SESSION["dn"] = $dn;
			} else {
				$msg = "<br><br><center><strong>Login Inválido por favor entre em contato conosco</strong></center>";
			}
			
			$stmt->close();
		}
	}

	// Se já estiver logado, busca os dados novamente
	if (isset($_SESSION["dn"]) && $_SESSION["dn"] != "") {
		$stmt = $con->prepare("SELECT * FROM VIEW_SIGA_CONSULTATRANSPORTE WHERE LOGIN_DN = ? OR DN = ?");
		
		if ($stmt) {
			$dn = $_SESSION["dn"];
			$stmt->bind_param("ss", $dn, $dn);
			$stmt->execute();
			$result = $stmt->get_result();
			$stmt->close();
		}
	}
?>
<!DOCTYPE html>
<html lang="pt-br">
	<head>
        <title>.:Gabardo:. Acompanhamento de Transporte</title>
        <meta name="description" content="Transgabardo">
        <meta name="keywords" content="">
		<meta charset="UTF-8">
        <meta name="author" content="Gane Tecnologia da Informação. www.ganeti.com.br">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<style>
			html { height: 100% }
			body {
				height: 100%; 
				margin: 0; 
				padding: 0;
				font-family: 'Roboto', sans-serif !important;
				font-size:10px!important;
				text-align:left;
				color: rgb(90, 90, 90) !important;
				background-color:#F5F5F5 !important;
				background-image: url("fundo.jpg");
				background-size: cover;
			}
			b, strong {
				font-weight: bolder;
				font-size:12px!important;
			}
			.container-fluid{
				padding:0;
			}
			.div-container-login{
				min-height: 100vh;
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex; 
				-webkit-box-align : center;
				-webkit-align-items : center;
				-moz-box-align : center;
				-ms-flex-align : center;
				align-items : center;
				width: 100%;
				-webkit-box-pack : center;
				-moz-box-pack : center;
				-ms-flex-pack : center;
				-webkit-justify-content : center;
				justify-content : center;
			}
			.div-login{
				width: 390px;
				max-width: 100%;
				background-color: #F4F4F4;
				padding: 5%;
				border-radius: 10px;
			}
			.div-login input{
				height: 30px;
				width: 100%;
				background-color: #FFF;
				padding: 1%;
				border-radius: 10px;
				text-transform: uppercase;
			}
			.div-login p{
				font-size:14px;
				color: #5f5f60;
			}
			.div-login #codigo{
				height: 30px;
				width: 100%;
				background-color: #FFF;
				padding: 1%;
				border-radius: 10px;
				border:1px solid #CCC;
			}
			.div-login #btn-login{
				color:#FFF;
				height: 30px;
				width: 100%;
				background-color: #345185;
				padding: 1%;
				border-radius: 10px;
				border:0px solid #CCC;
				cursor: pointer;
			}
			.div-usuario {
				color:#FFF;
				height:6vh;
				background-color: #afbdc7;
				padding-top:10px;
				background-image: url("fundo.jpg");
				background-size: cover;
			}
			.div-usuario p{
				float:right;
				line-height: 30px;
				font-size: 12px;
			}
			.div-usuario #btn-sair{
				width: 100px;
				background-color: #345185;
				padding: 0.5%;
				margin-top:0px;
				border-radius: 10px;
				border:0px solid #CCC;
				float:right;
				cursor: pointer;
			}
			.div-mapa{
				height:59vh;
				width:100%;
			}
			#map{
				width:100%;
				height: 100%;
				height: 59vh;
			}
			.div-tabela{
				height: 35vh;
				width:100%;
				background-color: #FFF;
			}
			.div-table {
				width:100%;
				border-radius: 5px !important;
				padding: 10px 1px 10px 10px;  
				margin: 0 0 20px 0;
				background-color: #FFF;
				overflow: auto;
			}
			.div-table-fixed {
				overflow: auto;
				height: 30vh;
				width:100%
			}
			table thead tr th{
				font-size: 10pt;
				position: sticky;
				top: 0;
				color: #FFF;
				background-color: #3366CC;
				border-collapse: collapse;
				text-transform: uppercase;
			}
			table td, table th {
				font-size: 10px;
				padding: 0px!important;
			}
			th, td {
				text-align: left;
				border-bottom: 1px solid #ddd;
				border: 1px solid #FFF;
			}

			table tr:hover {
				background-color:#f3ead1;
				cursor: pointer;
			}
			
			table thead tr th{
				position: sticky;
				top: 0;
				color: #FFF;
				background-color: #3366CC;
			}
		</style>
	</head>
	
	<body>
		<form name="frm" id="frm" method="post" autocomplete="off">
		<input type="hidden" name="cte" id="cte" value="">
		<?php
			if (!isset($_SESSION["dn"]) || $_SESSION["dn"] == "" || (isset($_POST['op']) && $_POST['op'] == "sair")){
				?>
					<div class="container div-container-login">
						<div class="row">
							<div class="col-sm-12">
								<div class="div-login" >
									<input type="hidden" name="op" id="op" value="login">
									<a target="_blank" href='https://www.grupogabardo.com.br/'> <img src="https://grupogabardo.com.br/wp-content/uploads/2017/03/logo.png" width="100%" alt="Gabardo"></a>
									<p>Informe o código de Acesso:
									<br>
									<br><input type="text" name="dn" id="codigo" pattern="[a-zA-Z0-9]+" required maxlength="50">
									<br>
									<br><input type="submit" name="btn-login" id="btn-login" value="Login">
									<?=$msg?>
									</p>
								</div>
							</div>
						</div>
					</div>
				<?php
			} else {
				?>
				<input type="hidden" name="dn" id="dn_hidden" value="<?=htmlspecialchars($_SESSION["dn"])?>">
				<div class="container-fluid">
					<div class="col-sm-12 div-usuario">
						<div class="row">
							<div class="col-sm-6">
								<a target="_blank" href='https://www.grupogabardo.com.br/'> <img src="https://grupogabardo.com.br/wp-content/uploads/2017/03/logo.png" width="100px" alt="Gabardo"></a>
							</div>
							<div class="col-sm-6">
								<p>
								<?php
									if ($result && $result->num_rows > 0){
										$row = $result->fetch_assoc();
										echo htmlspecialchars($row["CLIENTE"]);
									}
								?>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<input type="hidden" name="op" id="op" value="sair">
								<input type="submit" name="btn-sair" id="btn-sair" value="Sair">
								</p>
							</div>
						</div>
					</div>
					<div class="col-sm-12 div-mapa">
						<div class="row">
							<div id="map">
							</div>
						</div>
					</div>
					<div class="col-sm-12 div-tabela">
						<div class="row">
							<div class="div-table">
								<div class="div-table-fixed">
						
									<table width="100%">
										<thead>
											<tr>
												<th width="*">&nbsp;Viagem</th>
												<th width="*">&nbsp;CTE</th>
												<th width="*">&nbsp;PLACA/NOTA</th>												
												<th width="*">&nbsp;Saída</th>
												<th width="*">&nbsp;Motorista</th>
												<th width="*">&nbsp;Frota</th>
												<th width="*">&nbsp;Coleta</th>
												<th width="*">&nbsp;Entrega</th>
												<th width="*">&nbsp;Destinatário</th>
												<th width="*">&nbsp;Localização</th>
												<th width="*">&nbsp;Status CTE</th>
											</tr>
										</thead>
										<tbody>
											<?php
												if ($result && $result->num_rows > 0) {
													// Reset do ponteiro do result
													$result->data_seek(0);
													
													while ($row = $result->fetch_assoc()) {
														$classe = ($row["STATUSCTE"] == "EM ANDAMENTO") ? "tr-linha" : "";
														?>
														<tr class="<?=$classe?>" data-acao="editar" data-cte="<?=htmlspecialchars($row["CTE"])?>">
															<td>&nbsp;<?=htmlspecialchars($row["VIAGEM"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["CTE"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["NF_PLACA"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["DTSAIDA"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["MOTORISTA"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["FROTA"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["MUNCOLETA"]."-".$row["UFCOLETA"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["MUNENTREGA"]."-".$row["UFENTREGA"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["DESTINATARIO"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["DESCPOSICAO"])?></td>
															<td>&nbsp;<?=htmlspecialchars($row["STATUSCTE"])?></td>
														</tr>
														<?php
													}
												}
											?>
										</tbody>
									</table>
						
								</div>
							</div>	
						</div>
					</div>
				</div>
				<?php
			}
		?>

		</form>

		<!-- js files -->
		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEJlzUECdkAUQ6Ad3BUlaQYAKRu9O5M7o"></script>
		<script>
			<?php if (isset($_SESSION["dn"]) && $_SESSION["dn"] != "") { ?>
			console.log('Inicializando mapa...');

			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 4,
				center: new google.maps.LatLng(-14.799483, -55.675289),
				mapTypeId: 'roadmap'
			});

			var infowindow = new google.maps.InfoWindow({content: ''});

			var features = [
				<?php
					if ($result && $result->num_rows > 0) {
						// Reset do ponteiro do result
						$result->data_seek(0);
						
						while ($row = $result->fetch_assoc()) {
							if ($row["LATITUDE"] != "0" && $row["LONGITUDE"] != "0" && 
							    !empty($row["LATITUDE"]) && !empty($row["LONGITUDE"])){
								
								// Sanitiza os dados para JavaScript
								$lat = floatval($row["LATITUDE"]);
								$lng = floatval($row["LONGITUDE"]);
								$cteJs = htmlspecialchars($row["CTE"], ENT_QUOTES, 'UTF-8');
								
								// Sanitiza dados do balão
								$viagem = htmlspecialchars($row["BAL_VIAGEM"] ?? '', ENT_QUOTES, 'UTF-8');
								$cte_bal = htmlspecialchars($row["BAL_CTE"] ?? '', ENT_QUOTES, 'UTF-8');
								$dtsaida = htmlspecialchars($row["BAL_DTSAIDA"] ?? '', ENT_QUOTES, 'UTF-8');
								$motorista = htmlspecialchars($row["BAL_MOTORISTA"] ?? '', ENT_QUOTES, 'UTF-8');
								$frota = htmlspecialchars($row["BAL_FROTA"] ?? '', ENT_QUOTES, 'UTF-8');
								$coleta = htmlspecialchars($row["BAL_COLETA"] ?? '', ENT_QUOTES, 'UTF-8');
								$entrega = htmlspecialchars($row["BAL_ENTREGA"] ?? '', ENT_QUOTES, 'UTF-8');
								$destinatario = htmlspecialchars($row["BAL_DESTINATARIO"] ?? '', ENT_QUOTES, 'UTF-8');
								$dataposicao = htmlspecialchars($row["BAL_DATAPOSICAO"] ?? '', ENT_QUOTES, 'UTF-8');
								
								?>
								{
									title: '<?=$lat?>, <?=$lng?>',
									cte: '<?=$cteJs?>',
									position: new google.maps.LatLng(<?=$lat?>, <?=$lng?>),
									icon: 'caminhao.png',
									contentString: '<div class="google_box">' +
										'<strong>Viagem:</strong> <?=$viagem?><br>' +
										'<strong>CTE:</strong> <?=$cte_bal?><br>' +
										'<strong>Saída:</strong> <?=$dtsaida?><br>' +
										'<strong>Motorista:</strong> <?=$motorista?><br>' +
										'<strong>Frota:</strong> <?=$frota?><br>' +
										'<strong>Coleta:</strong> <?=$coleta?><br>' +
										'<strong>Entrega:</strong> <?=$entrega?><br>' +
										'<strong>Destinatário:</strong> <?=$destinatario?><br>' +
										'<strong>Atualização:</strong> <?=$dataposicao?><br>' +
										'</div>'
								},
								<?php
							}
						}
					}
				?>
			];
	
			// Adicionar os marcadores
			features.forEach(function(feature) {
				var marker = new google.maps.Marker({
					position: feature.position,
					map: map,
					title: feature.title,
					icon: feature.icon
				});
				
				// Se houver um CTE selecionado, abre o infowindow
				<?php if (!empty($cte)) { ?>
				if (feature.cte == "<?=htmlspecialchars($cte, ENT_QUOTES, 'UTF-8')?>"){
					infowindow.setContent(feature.contentString);
					infowindow.open(map, marker);
					map.setCenter(feature.position);
					map.setZoom(12);
				}
				<?php } ?>
				
				// Adiciona evento de clique no marcador
				marker.addListener('click', function() {
					infowindow.setContent(feature.contentString);
					infowindow.open(map, marker);
				});				
			}); 
			
			// Evento de clique na linha da tabela
			$(".tr-linha").click(function(){ 
				var c = $(this).attr('data-cte');
				console.log("CTE selecionado: " + c);

				$("#cte").val(c);
				$("#op").val("dados");
				$("#frm").submit();        
				return false;
			}); 
			<?php } ?>
		</script>
	</body>
</html>
<?php
	// Fecha conexão
	if (isset($con)) {
		mysqli_close($con);
	}
?>