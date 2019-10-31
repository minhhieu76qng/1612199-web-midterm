import React from 'react';
import { Card, message, Upload, Icon, Avatar } from 'antd';

const UploadAvatar = ({ user, uploadAvatar, success, errors }) => {
  const props = {
    customRequest({ file, onError, onProgress, onSuccess }) {
      uploadAvatar(file, onProgress, onSuccess, onError);
    }
  };

  return (
    <Card
      // loading={!user}
      title='Upload avatar'
      style={{
        maxWidth: 450,
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
      }}
    >
      {errors && errors.map(e => message.error(e.message))}
      {success && message.success(success.message)}

      <Avatar
        size={200}
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          marginBottom: 20,
          display: 'block'
        }}
        shape='square'
        src={user.avatar}
      />

      <Upload.Dragger {...props} accept='.jpg,.jpeg,.png'>
        <p className='ant-upload-drag-icon'>
          <Icon type='inbox' />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
      </Upload.Dragger>
    </Card>
  );
};

export default UploadAvatar;
