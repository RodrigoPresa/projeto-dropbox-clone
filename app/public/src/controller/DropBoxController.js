class DropBoxController {
    constructor(){

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl  = document.querySelector('#files');
        this.snackModal    = document.querySelector('#react-snackbar-root');

        this.initEvents();

    }

    initEvents(){
        //Seta o click no botão de enviar arquivos e abre a janela de arquivos
        this.btnSendFileEl.addEventListener('click', event =>{
            this.inputFilesEl.click();
        });

        //Chamado quando a imagem for selecionada, sendo alterado o change do inputFileEl
        this.inputFilesEl.addEventListener('change', event =>{
            console.log(event.target.files);
            this.uploadTask(event.target.files);
            this.snackModal.style.display = 'block';
        });
    }

    //Método que irá receber os arquivos para upload
    uploadTask(files){
        let promises = [];

        [...files].forEach(file=>{
            promises.push(new Promise((resolve, reject)=> {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');
                ajax.onload = event =>{
                    try{
                        resolve(JSON.parse(ajax.responseText));
                    }catch(e){
                        reject(e);
                    }
                };
                ajax.onerror = event =>{
                    reject(event);
                };
                let formData = new FormData();

                formData.append('input-file', file);

                ajax.send(formData);
            }));
        });

        return Promise.all(promises);
    }
}