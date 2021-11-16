import swal from 'sweetalert';

export const handleError = (data) => {
    swal({
        title: data.title,        
        icon: data.icon,
    });
}