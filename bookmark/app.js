document.getElementById('myForm').addEventListener('submit', bookmarkPages);

function bookmarkPages(e){
    let pageName = document.getElementById('pageName').value;
    let pageUrl = document.getElementById('pageUrl').value;

    if(!pageName || !pageUrl){
        alert('enter name and url');
        return false;
    }
    
    let bookmark = {
        name:pageName,
        url:pageUrl
    }

    
    // localStorage.setItem('test', 'heloo');
    // localStorage.getItem('test');
    // localStorage.removeItem('test');

    // console.log(localStorage.getItem('test'));

    if(localStorage.getItem('bookmarks') === null){
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    addBookmark();
    e.preventDefault();
}

function deleteBookmark(url){
    // console.log(url);
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url ===url ){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    addBookmark();
}

function addBookmark(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarkinfo = document.getElementById('bookmarkinfo');
    bookmarkinfo.innerHTML = '';
    for(let i=0; i<bookmarks.length; i++){
        let name = bookmarks[i].name; 
        let url = bookmarks[i].url; 
        bookmarkinfo.innerHTML += `<div class="bookmark_item flex">
                                        <div class="bookmark_item_content">
                                        <div class="bookmark_name">${name}</div>

                                            <div class="bookmark_url"><a href="${url}">visit</a></div>

                                        </div>
                                        <button onclick="deleteBookmark('${url}')" class="delete">delete</button>                
                                    </div>`;
        
    }
}

