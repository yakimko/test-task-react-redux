import React, { Component, PropTypes } from 'react';

import DebounceInput from 'react-debounce-input';

import { Button, Table, Pagination } from 'react-bootstrap';

import { sortOrder, defaultSortOrder } from '../../constants';
import { headers, usersPerPage } from '../../constants/users';

import Th from 'representation/pageLayout/tables/Th/Th';

import styles from './Users.css';

const fields = Object.keys(headers);

class UsersList extends Component {
    componentWillMount() {
        this.props.actions.fetchUsers();
    }

    sortUsers(sort) {
        const { query, actions: { setQuery } } = this.props;
        const order = query.sort === sort ? sortOrder[Number(query.order === defaultSortOrder)] : defaultSortOrder;

        setQuery({
            ...query,
            order,
            sort
        });
    }

    onSelectPage(page) {
        const { query, actions: { setQuery } } = this.props;

        setQuery({
            ...query,
            page
        });
    }

    onFilter(field, event) {
        const { query, actions: { setQuery } } = this.props;
        const text = event.target.value.trim();

        if (text) {
            setQuery({
                ...query,
                [field]: text
            });
        }
        else {
            const _query = {
                ...query
            };

            delete _query[field];

            setQuery(_query);
        }
    }

    render() {
        const {
            users,
            isFetching,
            page,
            order,
            sort,
            query
        } = this.props;

        const totalPages = Math.ceil(users.length / usersPerPage);
        const activePage = page > totalPages ? 1 : page;

        let resultComponent;

        if (isFetching) {
            resultComponent = (
                'Loading...'
            );
        }
        else {
            resultComponent = (
                <div>
                    <h2>Users</h2>
                    <Table>
                        <thead>
                        <tr>
                            {
                                fields.slice(0, 3).map(item => (
                                    <th key={Math.random()}>
                                        <DebounceInput debounceTimeout={500} onChange={this.onFilter.bind(this, item)} value={query[item]} />
                                    </th>
                                ))
                            }
                            <th colSpan="2" />
                        </tr>
                        <tr>
                            {
                                fields.map(item => (
                                    <Th key={Math.random()} order={sort === item ? order : ''} onClick={this.sortUsers.bind(this, item)}>{ headers[item] }</Th>
                                ))
                            }
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.slice(usersPerPage * (activePage - 1), usersPerPage * activePage).map(user => (
                                <tr key={user.id}>
                                    <td>{ user.firstName }</td>
                                    <td>{ user.lastName }</td>
                                    <td>{ user.email }</td>
                                    <td>{ user.active ? 'Active' : 'Inactive' }</td>
                                    <td>
                                        <Button
                                            bsSize="xsmall"
                                            bsStyle="link"
                                            onClick={this.props.actions.removeUser.bind(null, user.id)}
                                            className={styles.removeButton}>remove</Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    <section className="text-center">
                        <Pagination
                            prev
                            next
                            items={totalPages}
                            activePage={activePage}
                            onSelect={::this.onSelectPage}
                        />
                    </section>
                </div>
            );
        }

        return (
            <div className={styles.root}>
                { resultComponent }
            </div>
        );
    }
}

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    page: PropTypes.number,
    order: PropTypes.string,
    sort: PropTypes.string,
    query: PropTypes.object,
    actions: PropTypes.shape({
        setQuery: PropTypes.func,
        fetchUsers: PropTypes.func,
        removeUser: PropTypes.func
    })
};

export default UsersList;
