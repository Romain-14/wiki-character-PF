import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../store/slices/menu';

// custom hook qui permet de fermer le menu au montage du composant
// sera appelé sur toutes les pages accessible via le menu
export default function useCloseMenuOnMount() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.menu);

    useEffect(() => {
        if(isOpen) dispatch(toggleMenu())
    }, []);
}