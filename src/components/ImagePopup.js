function ImagePopup(props) {

  return (
    <section className={`popup popup_type_picture ${props.card ? 'popup_is-opened' : ''}`}>
      <div className="popup-content">
        <div className="popup__picture" name="picture">
          <button className="popup__close" onClick={props.onClose} type="button"></button>
          <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
          <h2 className="popup__image-title">{props.card ? props.card.name : ''}</h2>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;