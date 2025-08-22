import styles from "./MapEmbed.module.scss";

export default function MapEmbed() {
    return (
        <div className={styles.mapWrapper}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d91560.88062434208!2d105.76046732472547!3d9.828288754596837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNDknMDcuOSJOIDEwNcKwNDgnMTIuNSJF!5e0!3m2!1sen!2sbd!4v1730528831179!5m2!1sen!2sbd"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            ></iframe>
        </div>
    );
}
