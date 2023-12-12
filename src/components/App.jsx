import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPhotos } from 'Services/Services';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    imagesData: [],
    userInput: 'sakura',
    page: 1,
    loader: false,
    isOpenedModal: false,
    modalImgUrl: '',
  };
  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const images = await getPhotos(this.state.userInput, this.state.page);
      console.log(images);
      this.setState({ imagesData: [...images.hits] });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  }
  async componentDidUpdate(_, prevState) {
    if (
      this.state.userInput !== prevState.userInput ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loader: true });
        const images = await getPhotos(this.state.userInput, this.state.page);
        console.log(images);
        this.setState(prevState => ({
          imagesData: [...prevState.imagesData, ...images.hits],
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loader: false });
      }
    }
  }
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onSubmit = event => {
    event.preventDefault();
    const inputResult = event.currentTarget.elements.input.value;
    this.setState({ userInput: inputResult, page: 1, imagesData: [] });
  };
  openModal = imgUrl => {
    this.setState(prevState => ({
      isOpenedModal: !prevState.isOpenedModal,
      modalImgUrl: imgUrl,
    }));
  };
  closeModal = () => {
    this.setState(prevState => ({ isOpenedModal: !prevState.isOpenedModal }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          imagesData={this.state.imagesData}
          openModal={this.openModal}
        />
        {this.state.imagesData.length !== 0 ? (
          <Button updatePage={this.handleLoadMore} />
        ) : null}
        {this.state.loader === true ? <Loader /> : null}
        {this.state.isOpenedModal && (
          <Modal
            closeModal={this.closeModal}
            modalImgUrl={this.state.modalImgUrl}
          />
        )}
      </div>
    );
  }
}
