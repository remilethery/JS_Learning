document.addEventListener('DOMContentLoaded',function(){


    document.getElementById('charge').addEventListener('click',charge);

    function charge(){
        let objAjax = new XMLHttpRequest();
        let id_employes = document.getElementById('id_employes').value;
        let param = 'id_employes=' + id_employes;
        objAjax.open('POST','interro.php',true);
        objAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        objAjax.send(param);
        objAjax.onreadystatechange = function(){
            if( objAjax.readyState == 4 && objAjax.status ==200){
                let obj = JSON.parse(objAjax.responseText);
                document.getElementById('resultat').innerHTML = obj.resultats;
            }
        }
    }


});