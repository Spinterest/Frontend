export class Toast {
    static ToastTypes = ['success', 'error', 'warning', 'info']

    constructor(message, type) {

        if (Toast.ToastTypes.indexOf(type) === -1) {
            console.error('Type must be defined in the Toast.ToastTypes');
            return;
        }

        this.message = message;
        this.type = type;

        this.notifications = document.querySelector(".notifications");

        this.createToast()
    }

    removeToast = (toast) => {
        toast.classList.add("hide")
        if (toast.timeoutId) clearTimeout(toast.timeoutId)
        setTimeout(() => toast.remove(), 500)
    }

    createToast() {
        const toast = document.createElement("li")
        toast.className = `toast ${this.type}`

        const article = document.createElement('div');
        article.className = 'column';

        const span = document.createElement('span');
        span.textContent = this.message;

        const button = document.createElement('button');
        button.textContent = 'X';
        button.onclick = () => this.removeToast(toast);

        article.appendChild(span);
        article.appendChild(button);
        toast.appendChild(article);

        this.notifications.appendChild(toast)

        toast.timeoutId = setTimeout(() => this.removeToast(toast), 5000)
    }

}
