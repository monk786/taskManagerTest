import keyBy from 'lodash/keyBy';

export const getUserData = ( userList, userId ) => {
    let userMappingHash = keyBy(userList, 'id');
    return userMappingHash[ userId ];
}