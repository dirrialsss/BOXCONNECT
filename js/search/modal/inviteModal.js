export function setupModal() {
    const modal = document.getElementById('invite-modal');
    const closeBtn = modal.querySelector('.close-button');

    document.getElementById('boxers-container').addEventListener('click', e => {  
        if (e.target.closest('.invite-button')) {  
            modal.classList.remove('hidden');  
        }  
    });  

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));  

    window.addEventListener('click', e => {  
        if (e.target === modal) modal.classList.add('hidden');  
    });  
}