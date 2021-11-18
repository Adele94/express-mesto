function PopupWithForm(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}  >
      <div className="popup__container">
        <button className="popup__close " onClick={props.onClose} type="button"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__content" name={`${props.name}`} onSubmit={props.onSubmit} >
          {props.children}
          <button type="submit" className="popup__save" >{props.buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;