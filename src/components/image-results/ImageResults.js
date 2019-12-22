import React, { Component } from 'react';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
  DialogActions,
  Button
} from '@material-ui/core';
import ZoomIn from '@material-ui/icons/ZoomIn';

class ImageResults extends Component {
  state = {
    open: false,
    currentImage: ''
  };

  handleOpen = img => {
    this.setState({ open: true, currentImage: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cellHeight={160} cols={3}>
          {images.map(image => (
            <GridListTile key={image.id}>
              <img src={image.largeImageURL} alt={image.tags} />
              <GridListTileBar
                title={image.tags}
                subtitle={
                  <span>
                    by <strong>{image.user}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton
                    onClick={() => this.handleOpen(image.largeImageURL)}
                  >
                    <ZoomIn color='primary' fontSize='large' />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    return (
      <div>
        {imageListContent}
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <img src={this.state.currentImage} alt='' style={{ width: '100%' }} />
          <DialogActions>
            <Button onClick={this.handleClose} color='primary' autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ImageResults;
