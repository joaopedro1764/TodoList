import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Modal from "@mui/material/Modal";
import Card from '@mui/material/Card';
import 'react-toastify/dist/ReactToastify.css';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "./TodoList.css";
import { TextField } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { toast, ToastContainer } from "react-toastify";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputAdornment from '@mui/material/InputAdornment';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  // usado para formatar as datas 
  const moment = require("moment");
  const date = new Date();
  const hoje = moment(date).format('YYYY-MM-DD');
  // --- usados para receber dados das Api ---
  const [tipo, setTipo] = useState([]);
  const [tarefa, setTarefa] = useState([]);
  // usados para controlar o estado dos dados...
  const [openModal, setOpenModal] = useState(false);
  const [openModalAlt, setOpenModalAlt] = useState(false);
  const [openModalConfirm, setModalConfirm] = useState(false);
  const [openModalTipoInfo, setOpenModalTipoInfo] = useState(false);
  const [openModalTipo, setOpenModalTipo] = useState(false);
  const [openModalTipoAlt, setOpenModalTipoAlt] = useState(false);
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [tipoNomeErro, setTipoNomeErro] = useState("");
  const [descricaoErro, setDescricaoErro] = useState("");
  const [dataErro, setDataErro] = useState("");
  const [tipoErro, setTipoErro] = useState("");
  const [imagemErro, setImagemErro] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [imagem, setImagem] = useState("");
  const [dataPrevista, setDataPrevista] = useState("");
  const [text, setText] = useState("")


  useEffect(() => {
    fetch("http://localhost:8080/api/tipo")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipo(retorno_convertido)); //lista de tipo de atendimento
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/tarefa")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTarefa(retorno_convertido)); //lista de tipo de atendimento
  }, []);



  const cadastroSucesso = () => {

    toast.success("Cadastrado Com Sucesso !", {
      position: "top-center",

      autoClose: 4500,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",

      // faz com que seja possivel arrastar

      draggable: true,

      progress: undefined,
    });

  };

  const alteradoSucesso = () => {

    toast.success("Alterado Com Sucesso !", {
      position: "top-center",

      autoClose: 4500,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",

      // faz com que seja possivel arrastar

      draggable: true,

      progress: undefined,
    });


  };



  const finalizadoSucesso = () => {

    toast.success("Finalizado Com Sucesso !", {
      position: "top-center",

      autoClose: 4500,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",

      // faz com que seja possivel arrastar

      draggable: true,

      progress: undefined,
    });


  };

  const excluidoSucesso = () => {

    toast.success("Removido Com Sucesso !", {
      position: "top-center",

      autoClose: 4500,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",

      // faz com que seja possivel arrastar

      draggable: true,

      progress: undefined,
    });


  };

  const msgErro = () => {

    toast.error("Não é possivel deletar pois está associado a uma tarefa!", {
      position: "top-center",

      autoClose: 4500,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",

      // faz com que seja possivel arrastar

      draggable: true,

      progress: undefined,
    });


  };

  let base64StringProduto;
  const uploadImagemTarefa = async (e) => {


    const file = e.target.files[0];
    const teste = await base64Produto(file);
    base64StringProduto = teste;

    var receberArquivo = document.getElementById("imagem").files;

    if (receberArquivo.length > 0) {
      var carregarImagem = receberArquivo[0];

      var lerArquivo = new FileReader();

      lerArquivo.onload = function (arquivoCarregado) {
        var imagemBase64 = arquivoCarregado.target.result;

        var novaImagem = document.createElement("img");

        novaImagem.src = imagemBase64;

        document.getElementById("verImagem").innerHTML = novaImagem.outerHTML;

      };
      lerArquivo.readAsDataURL(carregarImagem);
    }

    setImagem(base64StringProduto)
  };

  const base64Produto = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const cadastrarTarefa = async (event) => {
    // nao deixando atualizar
    event.preventDefault();
    // pegando os names atribuidos aos input
    const nameInput = new FormData(event.target);

    //pegando os valores dos inputs
    const data = Object.fromEntries(nameInput);

    // montando o json
    let jsonTarefa = {
      nome: data.nome,
      tipo: { id: data.tipo },
      dataPrevista: data.dataPrevista,
      descricao: data.descricao,
      imagem: imagem
    };

    let result = await fetch(`http://localhost:8080/api/tarefa/addTarefa`, {
      method: "post",
      body: JSON.stringify(jsonTarefa),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (result.status === 201) {

      setOpenModal(false)
      getAll();
      cadastroSucesso();
      window.location.reload()
    } else if (result.status === 400) {
      // captura o atributo que esta vazio pela msg enviada do back
      let dados = await result.json()
      setText(dados.nome)

    }
  };

  const finalizarTarefa = async (id) => {
    let result = await fetch(`http://localhost:8080/api/tarefa/finalizar/${id}`, {
      method: "PUT",

      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (result.status === 200) {

      getAll();
      finalizadoSucesso()
    }
  };


  const buscaTarefa = async (text) => {

    let key = text.target.value;

    let result = await fetch(`http://localhost:8080/api/tarefa/buscaTarefa`, {
      method: "post",
      body: JSON.stringify(key),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });


    if (result) {

      result = await result.json();

      setTarefa(result);
    }

  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const alterarTarefa = async (id) => {

    let idAlt = document.getElementById("idAlt").value;
    let nome = document.getElementById("nomeAlt").value;
    let descricao = document.getElementById("descricaoAlt").value;
    let dataPrevista = document.getElementById("dataPrevistaAlt").value;
    let idTipo = document.getElementById("tipoALt").value;

    let jsonAlt = {

      id: idAlt,
      nome: nome,
      descricao: descricao,
      dataPrevista: dataPrevista,
      tipo: { id: idTipo },
      imagem: imagem
    }

    let result = await fetch(`http://localhost:8080/api/tarefa/alterar/${id}`, {
      method: "PUT",

      body: JSON.stringify(jsonAlt),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (result.status === 200) {

      setOpenModalAlt(false)
      alteradoSucesso()
      getAll();


    } else if (result.status === 400) {
      // captura o atributo que esta vazio pela msg enviada do back
      let dados = await result.json()
      setText(dados.nome)

    }
  };


  const selecionarTarefa = async (tarefa) => {



    setId(tarefa.id)
    setNome(tarefa.nome)
    setTipoId(tarefa.tipo.id)
    setDataPrevista(tarefa.dataPrevista)
    setDescricao(tarefa.descricao)
    setImg(tarefa.imagem)
    setOpenModalAlt(true)

  }

  const selecionar = (id) => {


    setId(id)
    setModalConfirm(true)

  }


  const deletarTipo = async (id) => {

    let result = await fetch(`http://localhost:8080/api/tipo/deletar/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_API_URL,
        "Access-Control-Request-Headers": 'Content-Type, Authorization'
      },
    });


    if (result.status === 200) {

      setOpenModalTipoAlt(false);
      excluidoSucesso();
      getAllTipo()

    } else {
      msgErro()
    }
  };

  const excluirTarefa = async (id) => {

    let result = await fetch(`http://localhost:8080/api/tarefa/deletar/${id}`, {
      method: "DELETE",

    });


    if (result.status === 200) {

      setModalConfirm(false);
      excluidoSucesso()
      getAll();
    }
  };

  const getAll = async (id) => {
    let result = await fetch(`http://localhost:8080/api/tarefa/`, {
      method: "GET",

      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json()

    setTarefa(result)
  };


  const getAllTipo = async (id) => {
    let result = await fetch(`http://localhost:8080/api/tipo/`, {
      method: "GET",

      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json()

    setTipo(result)
  };

  const cadastrarTipo = async (event) => {
    // nao deixando atualizar
    event.preventDefault();
    // pegando os names atribuidos aos input
    const nameInput = new FormData(event.target);

    //pegando os valores dos inputs
    const data = Object.fromEntries(nameInput);

    let result = await fetch(`http://localhost:8080/api/tipo/addTipo`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (result.status === 201) {

      setOpenModalTipo(false)

      cadastroSucesso()

      setTimeout(() => {
        window.location.reload()
      }, 3000);

    }
  };


  const closeModal = () => {

    setOpenModal(false)
    setDataErro("")
    setNomeErro("")
    setDescricaoErro("")
    setImagemErro("")

  }

  const closeModalTipo = () => {

    setTipoNomeErro("")
  }





  return (
    <>

      <h1 style={{ textAlign: "center" }}>TODO LIST</h1>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div style={{ width: "100%", margin: "0 auto", display: "flex", flexDirection: "row" }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={buscaTarefa}
          sx={{ margin: "10px auto" }}
          label="Busque"
          variant="outlined"
        />
      </div>

      <div>
        <Button
          sx={{ backgroundColor: "red", color: "#fff", margin: "50px" }}
          onClick={() => setOpenModal(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Cadastrar Tarefa
        </Button>

        <Button
          sx={{ backgroundColor: "red", float: "right", margin: "50px" }}
          startIcon={<AddIcon />}
          onClick={() => setOpenModalTipo(true)}
          variant="contained"

        >
          Cadastrar Tipo:
        </Button>

        <Button
          sx={{ backgroundColor: "red", float: "right", margin: "50px" }}
          startIcon={< FormatListNumberedRtlIcon />}
          onClick={() => setOpenModalTipoInfo(true)}
          variant="contained"

        >
          Lista Tipo:
        </Button>

        <div className="cardTarefa">
          <>
            {tarefa.map((tarefa, indice) => (
              <Card className="SubCardTarefa" key={indice}>
                <CardActionArea>
                  <CardMedia

                    className="cardImg"
                    component="img"
                    sx={{ height: 140, backgroundSize: "cover !important" }}
                    image={tarefa.imagem}
                    alt={tarefa.nome}
                  />
                  <CardContent>
                    <Typography sx={{ fontWeight: "bold" }} gutterBottom variant="h5" component="div">
                      {tarefa.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Descrição:  {tarefa.descricao}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Data Prevista: {moment(tarefa.dataPrevista).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tipo:  {tarefa.tipo.nome}
                    </Typography>
                    {tarefa.status === true ? (
                      <Typography variant="body2" color="text.secondary">
                        Data Concluida:   {moment(tarefa.dataConcluida).format("DD/MM/YYYY")}
                      </Typography>
                    ) : (

                      <Tooltip sx={{ float: "right" }} title="Finalizar">
                        <IconButton onClick={() => finalizarTarefa(tarefa.id)} aria-label="alterar">
                          <CheckCircleOutlineIcon fontSize="large" sx={{ color: "#e63946" }} />
                        </IconButton>
                      </Tooltip>
                    )}




                    <Tooltip sx={{ float: "right" }} title="Alterar">
                      <IconButton onClick={() => selecionarTarefa(tarefa)} aria-label="alterar">
                        <EditIcon fontSize="large" sx={{ color: "#e63946" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip sx={{ float: "right" }} title="Deletar">
                      <IconButton onClick={() => selecionar(tarefa.id)} aria-label="delete">
                        <DeleteIcon fontSize="large" sx={{ color: "#e63946" }} color="action" />
                      </IconButton>
                    </Tooltip>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </>
        </div>
      </div>

      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        open={openModalTipo}
        onClose={() => closeModalTipo()}
      >
        <form method="post" onSubmit={cadastrarTipo}>
          <Box className="boxModalTipo">

            <IconButton className="iconClose" onClick={() => setOpenModalTipo(false)} aria-label="alterar">
              <Tooltip placement="right-end" title="Fechar">
                <CancelIcon className="icon" sx={{ color: "red" }} />
              </Tooltip>
            </IconButton>

            <h1 style={{ textAlign: "center" }}>Adicionar Tipo</h1>
            <TextField
              autoFocus="true"
              error={tipoNomeErro.length === 0}
              onChange={e => setTipoNomeErro(e.target.value)}
              helperText={tipoNomeErro.length === 0 ? 'Preencha este Campo!' : ' '}
              sx={{ margin: "20px auto" }}
              name="nome"
              className="input"
              placeholder="Nome"
              type="text"
              variant="outlined"
            >
              Nome
            </TextField>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>


              <Button type="submit" className="btnCad" variant="contained" startIcon={<SaveIcon />}>
                Cadastrar
              </Button>
            </div>
          </Box>
        </form>
      </Modal>


      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        open={openModalTipoAlt}
        onClose={() => setOpenModalTipoAlt(false)}
      >
        <form method="post" onSubmit={cadastrarTipo}>
          <Box className="boxModalTipo">

            <IconButton className="iconClose" onClick={() => setOpenModalTipo(false)} aria-label="alterar">
              <Tooltip placement="right-end" title="Fechar">
                <CancelIcon className="icon" sx={{ color: "red" }} />
              </Tooltip>
            </IconButton>

            <h1 style={{ textAlign: "center" }}>Adicionar Tipo</h1>
            <TextField
              error={tipoNomeErro.length === 0}
              onChange={e => setTipoNomeErro(e.target.value)}
              helperText={tipoNomeErro.length === 0 ? 'Preencha este Campo!' : ' '}
              sx={{ margin: "20px auto" }}
              name="nome"
              className="input"
              placeholder="Nome"
              type="text"
              variant="outlined"
            >
              Nome
            </TextField>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>


              <Button type="submit" className="btnCad" variant="contained" startIcon={<SaveIcon />}>
                Cadastrar
              </Button>
            </div>
          </Box>
        </form>
      </Modal>



      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalTipoInfo}
        onClose={() => setOpenModalTipoInfo(false)}
      >
        <form method="post">
          <Box className="boxModalTipoInfo">
            <IconButton className="iconClose" onClick={() => setOpenModalTipoInfo(false)} aria-label="alterar">
              <Tooltip placement="right-end" title="Fechar">
                <CancelIcon className="icon" sx={{ color: "red" }} />
              </Tooltip>
            </IconButton>
            <Typography component="div" sx={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}
              variant="h1">Lista Tipos:</Typography>

            {tipo.map((obj) => (
              <>
                <div className="divTipo">

                  <Typography component="div" sx={{ fontWeight: "bold" }} variant="h5">Nome:  </Typography>
                  <Typography component="div" sx={{ fontWeight: "bold" }} variant="h5"> {""}{obj.nome}</Typography>

                  <IconButton size="large" className="iconClose" onClick={() => deletarTipo(obj.id)} aria-label="alterar">
                    <Tooltip placement="right-end" title="Deletar">
                      <DeleteIcon className="icon" sx={{ color: "red", float: "right !important" }} />
                    </Tooltip>
                  </IconButton>
                </div></>
            ))}


          </Box>
        </form>
      </Modal>

      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalConfirm}
        onClose={() => setModalConfirm(false)}
      >

        <div className="divPai">

          <Box className="boxModalConfirm">

            <h1>Deseja Realmente Excluir? </h1>
            <div>
              <Button onClick={() => setModalConfirm(false)} variant="contained" color="error" startIcon={<CancelIcon />} sx={{ marginRight: "20px" }}>Cancelar</Button>
              <Button startIcon={<DeleteIcon />} color="error" onClick={() => excluirTarefa(id)} variant="contained">Excluir</Button>
            </div>
          </Box>
        </div>

      </Modal>



      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={openModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        onClose={() => closeModal()}
      >
        <form method="post" onSubmit={cadastrarTarefa}>
          <Box className="boxModal">
            <IconButton className="iconClose" onClick={() => setOpenModal(false)} aria-label="alterar">
              <Tooltip placement="right-end" title="Fechar">
                <CancelIcon className="icon" sx={{ color: "red" }} />
              </Tooltip>
            </IconButton>
            <h1 className="tituloTarefa">Cadastrar Tarefa</h1>

            <div className="divInput">


              <TextField
                error={nomeErro.length === 0}
                onChange={e => setNomeErro(e.target.value)}
                helperText={nomeErro.length === 0 ? 'Preencha este Campo!' : ' '}
                name="nome"
                className="input"
                placeholder="Nome"
                type="text"
                label="Nome"
                variant="outlined"
              >
                Nome
              </TextField>
              <TextField
                error={descricaoErro.length === 0}
                onChange={e => setDescricaoErro(e.target.value)}
                helperText={descricaoErro.length === 0 ? 'Preencha este Campo!' : ' '}
                name="descricao"
                placeholder="Descrição"
                className="input"
                type="text"
                label="Descrição"
                variant="outlined"
              >
                Descrição
              </TextField>
            </div>

            <h3 style={{ textAlign: "center", marginBottom: "-3px" }}>Selecione Um Tipo</h3>
            <select name="tipo" className="select">

              {tipo.map((tipo, indice) => (
                <option className="option" value={tipo.id} key={indice}>
                  {tipo.nome}
                </option>
              ))}
            </select>
            <h3 style={{ textAlign: "center", marginBottom: "-1px" }}>Data Prevista</h3>
            <TextField
              onInput={(e) => {

                e.target.value = (e.target.value).toString().slice(0, 10)

              }}
              sx={{ margin: "0 auto" }}
              error={dataErro.length === 0}
              onChange={e => setDataErro(e.target.value)}
              helperText={dataErro.length === 0 ? 'Preencha este Campo!' : ' '}
              name="dataPrevista"
              className="input"
              type="date"
              InputProps={{ inputProps: { min: hoje } }}
              variant="outlined"
            >
              Data Prevista
            </TextField>



            <h3 className="labelSelect">Selecione Uma Imagem</h3>

            <TextField

              error={text === "imagem"}

              helperText={text === "imagem" ? 'Selecione uma imagem!' : ' '}
              type="file"
              accept="image/*"
              onChange={uploadImagemTarefa}
              name="imagem"
              id="imagem"
              className="inputArquivo"
              variant="outlined"
            />
            <div id="verImagem"></div>

            <Button className="btnCad" type="submit" variant="contained" startIcon={<SaveIcon />}>
              Cadastrar
            </Button>
          </Box>
        </form>
      </Modal>

      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={openModalAlt}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        onClose={() => setOpenModalAlt(false)}
      >
        <form>
          <input type="hidden" id="idAlt" defaultValue={id} />
          <Box className="boxModal">
            <IconButton className="iconClose" onClick={() => setOpenModalAlt(false)} aria-label="alterar">
              <Tooltip placement="right-end" title="Fechar">
                <CancelIcon className="icon" sx={{ color: "red" }} />
              </Tooltip>
            </IconButton>
            <h1 className="tituloTarefa">Alterar Tarefa</h1>

            <div className="divInput">
              <TextField
                error={text === "nome"}
                helperText={text === "nome" ? 'Preencha este Campo!' : ' '}
                id="nomeAlt"
                defaultValue={nome}
                label="Nome"
                sx={{ margin: "0 auto" }}
                name="nome"
                className="input"
                placeholder="Nome"
                type="text"
                variant="outlined"
              />


              <TextField
                error={text === "descricao"}
                helperText={text === "descricao" ? 'Preencha este Campo!' : ' '}
                id="descricaoAlt"
                defaultValue={descricao}
                label="Descrição"
                sx={{ margin: "20px auto" }}
                name="descricao"
                className="input"
                placeholder="Descrição"
                type="text"
                variant="outlined"
              />

            </div>
            <h3 style={{ textAlign: "center", marginBottom: "-3px" }}>Selecione Um Tipo</h3>
            <select id="tipoALt" className="select">

              {tipo.map((obj, indice) => (
                <option className="option" selected={tipoId === obj.id} value={obj.id}>
                  {obj.nome}
                </option>
              ))}
            </select>
            <h3 style={{ textAlign: "center", marginBottom: "-1px" }}>Data Prevista</h3>
            <TextField
              error={text === "data"}
              helperText={text === "data" ? 'Preencha este Campo!' : ' '}
              id="dataPrevistaAlt"
              InputProps={{ inputProps: { min: hoje } }}
              defaultValue={dataPrevista}
              sx={{ margin: "0 auto" }}

              name="dataPrevista"
              className="input"
              type="date"
              variant="outlined"
            >
              Data Prevista
            </TextField>




            <TextField
              error={text === "imagem"}
              helperText={text === "imagem" ? 'Preencha este Campo!' : ' '}
              sx={{ marginTop: "30px !important" }}
              type="file"
              accept="image/*"
              onChange={uploadImagemTarefa}
              name="imagem"
              id="imagem"
              className="inputArquivo"
              variant="outlined"
            />

            <div id="verImagem"><img src={img} /></div>




            <Button startIcon={<EditIcon />} className="btnCad" onClick={() => alterarTarefa(id)} variant="contained">
              Alterar
            </Button>


          </Box>
        </form>
      </Modal>

    </>
  );
}

export default App;
