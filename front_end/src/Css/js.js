let menuTogle = document.querySelector('.menuTogle');
        let sidebar = document.querySelector('.sidebar');
        menuTogle.onclick = function () {
            menuTogle.classList.toggle('active');
            sidebar.classList.toggle('active');
        }
        let list = document.querySelectorAll('.MenuList li');
        function activeLink() {
            list.forEach((item) =>
                item.classList.remove('active'));
            this.classList.add('active');
        }
        list.forEach((item) =>
            item.addEventListener('click', activeLink));