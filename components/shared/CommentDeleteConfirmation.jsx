import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Button, Card } from 'react-native-paper';

const CommentDeleteConfirmation = () => {
  return (
    <Card style={styles.card}>
      <Card.Title
        titleStyle={{
          textAlignVertical: 'center',
          textAlign: 'center',
          fontSize: 16,
        }}
        title={'Are you sure you want to delete this comment?'}
      />

      <View style={styles.actionsContainer}>
        <Button mode='default' icon='window-close'>
          Cancel
        </Button>
        <Button labelStyle={{ color: 'red' }} mode='default' icon='check'>
          Delete
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CommentDeleteConfirmation;
