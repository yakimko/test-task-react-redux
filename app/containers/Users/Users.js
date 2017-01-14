import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import sortBy from 'lodash.sortby';
import pick from 'lodash.pick';

import { sortOrder, defaultSortOrder } from '../../constants';
import { headers } from '../../constants/users';

import * as actions from '../../actions/users';

import Users from '../../components/Users';

const fields = Object.keys(headers);

const mapStateToProps = (state, ownProps) => {
    const { query: { page, sort, order, ...restQuery } = {} } = ownProps.location;
    const { items, isFetching } = state.users.usersList;
    const filterBy = pick(restQuery, fields.slice(0, 3));

    const filteredUsers = items.filter(user =>
        Object
            .keys(filterBy)
            .map(item => user[item].toLowerCase().includes(filterBy[item].toLowerCase()))
            .every(item => item));

    const sortedUsers = sortBy(filteredUsers, sort);
    const _order = sortOrder.includes(order) ? order : defaultSortOrder;

    if (_order !== defaultSortOrder) {
        sortedUsers.reverse();
    }

    return {
        isFetching,
        page: Number(page) || 1,
        sort: sort || fields[0],
        order: _order,
        query: ownProps.location.query,
        users: sortedUsers
    }
};

export const mapDispatchToProps = dispatch => ({
    actions: Object.assign(
        bindActionCreators(actions, dispatch),
        {
            setQuery: query => {
                dispatch(push({
                    query
                }));
            }
        }
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
