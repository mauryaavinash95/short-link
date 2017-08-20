import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinksListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            justCopied: false,
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            this.refs.copy = "Copied"
            setTimeout(() => {
                this.setState({ justCopied: false });
                this.refs.copy = "Copy"
            }, 1000);
        }).on('error', () => {
            alert("Could not copy");
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessge = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;
        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return <p className="item__message">{this.props.visitedCount} {visitMessge} {visitedMessage} </p>;
    }

    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shorturl}</p>
                {/* {<p>{this.props.visitedCount} | {this.props.lastVisitedAt}</p>} */}
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shorturl} target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shorturl}>
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }
                }>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )
    }
}

LinksListItem.PropTypes = {
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    shorturl: React.PropTypes.string.isRequired,
    vistedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number,
}