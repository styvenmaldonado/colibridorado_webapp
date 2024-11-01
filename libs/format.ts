import {format} from "date-fns";
import es from "date-fns/locale/es";

export  const formatDate = (date: Date): string => {
    return format(new Date(date || ""), "d 'de' MMMM yyyy - hh:mm aaaa", {
        locale: es
    });
}

export  const formatCurrency = (value: number, locale: string = 'en-US', currency: string = 'USD'): string => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}