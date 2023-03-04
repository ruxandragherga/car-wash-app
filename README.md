Proiect: Programare online la spalatorie auto

Descriere: 
Pentru a oferi o solutie problemei cozilor intalnite frecvent la spalatoriile auto, aplicatia ofera clientilor posibilitatea de a se programa online in doar cateva minute, dar si administratorului spalatoriei posibilitatea de a-si optimiza modul de gestionare al programarilor.

Autentificare (client/administrator) – utilizatorul se va loga pe baza unui username si a unei parole; in momentul crearii unui cont utilizatorul va fi nevoit sa introduca si alte informatii aditionale (nume, prenume, numar de telefon)

Administrator: Pagina principala – aici administratorul poate adauga sau sterge servicii de spalatorie sau polish si preturile aferente; contine butonul catre pagina cu programarile viitoare si butonul catre istoricul programarilor la spalatorie 

                Pagina cu programarile viitoare – lista programarilor viitoare ordonate dupa data, fiecare cu detaliile despre client (prenume, nume, nr. telefon), serviciile selectate, suma totala  

                Pagina cu istoricul clientilor – lista programarilor care au fost deja onorate, fiecare cu detaliile despre client (prenume, nume, nr. telefon), serviciile selectate,  suma totala 

 

Client: Pagina pricipala – aici clientul poate vedea serviciile oferite de spalatorie si preturile pe categorii, butonul catre pagina “Programare”, butonul catre pagina “Programarile mele” 

        Pagina in care isi creeaza o programare – clientul selecteaza serviciile dorite in functie de categoria autoturismului detinut, data si ora programarii, numarul de inmatriculare al masinii 

        Pagina cu istoricul programarilor – contine lista cu toate programarile clientului, fiecare cu serviciile selectate, preturile si suma totala 

 

Limbaje de programare folosite pentru UI: 

                        TypeScript – framework de React 

Librarii React folosite pentru UI: 

                        MUI – interfata 

                        React-router-dom – navigatie ecrane 

Limbaje de programare & software folosite pentru backend: 

                        PHP MySql 



Tabele baze de date:  

        Persoane (id, nume, prenume, email, parola, nr. telefon, client/administrator) 

        Servicii (id, categorie, denumire, pret categoria 1, pret categoria 2, pret categoria 3) 

        Programari (id, id user, servicii solicitate, data si ora, numarul de inmatriculare al masinii, prenume client, nume client, nr. telefon client)