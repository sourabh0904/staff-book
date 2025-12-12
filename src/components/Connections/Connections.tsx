'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiCheck, FiX, FiUserPlus, FiUserMinus, FiUsers, FiSearch, FiMessageCircle, FiMoreHorizontal, FiChevronDown, FiFilter } from 'react-icons/fi';
import { THEME } from '@/styles/theme';
import Card from '../shared/Card';
import ConnectButton from '../shared/ConnectButton';
import {
  connectionRequests,
  myConnections,
  peopleYouMayKnow,
  sentRequests,
  ConnectionRequest,
  Connection,
  PeopleYouMayKnow,
} from '@/data/connections';

type SortType = 'recently-added' | 'first-name' | 'last-name';

const Connections: React.FC = () => {
  const [requests, setRequests] = useState<ConnectionRequest[]>(connectionRequests);
  const [connections, setConnections] = useState<Connection[]>(myConnections);
  const [suggestions, setSuggestions] = useState<PeopleYouMayKnow[]>(peopleYouMayKnow);
  const [sent, setSent] = useState<Connection[]>(sentRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('recently-added');
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Handle Accept Request
  const handleAccept = (id: string) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      setConnections([
        {
          id: request.id,
          name: request.name,
          avatar: request.avatar,
          title: request.title,
          mutualConnections: request.mutualConnections,
          isFollowing: true,
        },
        ...connections,
      ]);
      setRequests(requests.filter((r) => r.id !== id));
    }
  };

  // Handle Ignore Request
  const handleIgnore = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  // Handle Connect
  const handleConnect = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (suggestion) {
      setSent([
        {
          id: suggestion.id,
          name: suggestion.name,
          avatar: suggestion.avatar,
          title: suggestion.title,
          company: suggestion.company,
          mutualConnections: suggestion.mutualConnections,
        },
        ...sent,
      ]);
      setSuggestions(suggestions.filter((s) => s.id !== id));
    }
  };

  // Handle Withdraw Request
  const handleWithdraw = (id: string) => {
    setSent(sent.filter((s) => s.id !== id));
  };

  // Handle Follow/Unfollow
  const handleFollowToggle = (id: string) => {
    setConnections(
      connections.map((conn) =>
        conn.id === id ? { ...conn, isFollowing: !conn.isFollowing } : conn
      )
    );
  };

  // Handle Remove Connection
  const handleRemove = (id: string) => {
    setConnections(connections.filter((c) => c.id !== id));
  };

  // Filter based on search
  const filteredConnections = connections.filter(
    (conn) =>
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'connections', label: 'My Connections', count: connections.length },
    { id: 'requests', label: 'Requests', count: requests.length },
    { id: 'sent', label: 'Sent', count: sent.length },
    { id: 'suggestions', label: 'Suggestions', count: suggestions.length },
  ];

  const [showAllRequests, setShowAllRequests] = useState(false);
  const [showAllSent, setShowAllSent] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const INITIAL_DISPLAY_COUNT = 4;

  return (
    <div className={`w-full space-y-6 ${THEME.layout.spacing.xl}`}>
      {/* Search & Filter Toolbar */}
      <div className={`${THEME.components.glass} rounded-xl relative z-30`}>
        <div className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between ${THEME.layout.spacing.lg}`}>
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${THEME.components.input.search} pl-10 bg-white/50 backdrop-blur-sm border-white/40 focus:border-primary/50`}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/50 border border-white/40 rounded-xl text-sm font-medium text-gray-700 hover:bg-white/70 transition-colors shadow-sm w-full md:w-auto justify-center backdrop-blur-sm"
            >
              <FiFilter className="w-4 h-4 text-gray-500" />
              <span>Sort by: {sortBy.replace('-', ' ')}</span>
              <FiChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {showSortMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/40 z-20 py-1 overflow-hidden">
                  {[
                    { id: 'recently-added', label: 'Recently added' },
                    { id: 'first-name', label: 'First name' },
                    { id: 'last-name', label: 'Last name' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id as SortType);
                        setShowSortMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50/50 hover:text-purple-600 text-gray-700 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 1. My Connections Section */}
      <Card noPadding>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className={THEME.components.typography.sectionTitle}>
            My Connections <span className="text-gray-400 text-sm font-normal ml-2">({connections.length})</span>
          </h2>
        </div>
        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto scrollbar-hide">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <LinkedInConnectionCard
                key={connection.id}
                connection={connection}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No connections found matching your search.</p>
            </div>
          )}
        </div>
      </Card>

      {/* 2. Connection Requests Section */}
      <div className="space-y-4">
        <h2 className={THEME.components.typography.sectionTitle}>
          Connection Requests <span className="text-gray-400 text-sm font-normal ml-2">({requests.length})</span>
        </h2>
        {requests.length === 0 ? (
          <EmptyState
            icon={<FiUsers className="w-12 h-12 text-gray-300" />}
            title="No pending requests"
            description="You don't have any pending connection requests at the moment."
          />
        ) : (
          <>
            <ScrollableSection>
              {requests.slice(0, showAllRequests ? undefined : INITIAL_DISPLAY_COUNT).map((request) => (
                <div key={request.id} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center">
                  <RequestCard
                    request={request}
                    onAccept={handleAccept}
                    onIgnore={handleIgnore}
                  />
                </div>
              ))}
            </ScrollableSection>
            {requests.length > INITIAL_DISPLAY_COUNT && (
              <div className="flex justify-center hidden md:flex">
                <button
                  onClick={() => setShowAllRequests(!showAllRequests)}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  {showAllRequests ? 'Show Less' : `Show All (${requests.length})`}
                  <FiChevronDown className={`transform transition-transform ${showAllRequests ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Sent Requests Section */}
      <div className="space-y-4">
        <h2 className={THEME.components.typography.sectionTitle}>
          Sent Invitations <span className="text-gray-400 text-sm font-normal ml-2">({sent.length})</span>
        </h2>
        {sent.length === 0 ? (
          <EmptyState
            icon={<FiUserPlus className="w-12 h-12 text-gray-300" />}
            title="No pending invitations"
            description="You haven't sent any connection requests recently."
          />
        ) : (
          <>
            <ScrollableSection>
              {sent.slice(0, showAllSent ? undefined : INITIAL_DISPLAY_COUNT).map((request) => (
                <div key={request.id} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center">
                  <SentRequestCard
                    request={request}
                    onWithdraw={handleWithdraw}
                  />
                </div>
              ))}
            </ScrollableSection>
            {sent.length > INITIAL_DISPLAY_COUNT && (
              <div className="flex justify-center hidden md:flex">
                <button
                  onClick={() => setShowAllSent(!showAllSent)}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  {showAllSent ? 'Show Less' : `Show All (${sent.length})`}
                  <FiChevronDown className={`transform transition-transform ${showAllSent ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Suggestions Section */}
      <div className="space-y-4">
        <h2 className={THEME.components.typography.sectionTitle}>
          People You May Know
        </h2>
        <ScrollableSection>
          {suggestions.slice(0, showAllSuggestions ? undefined : INITIAL_DISPLAY_COUNT).map((person) => (
            <div key={person.id} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center">
              <SuggestionCard
                person={person}
                onConnect={handleConnect}
              />
            </div>
          ))}
        </ScrollableSection>
        {suggestions.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center hidden md:flex">
            <button
              onClick={() => setShowAllSuggestions(!showAllSuggestions)}
              className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              {showAllSuggestions ? 'Show Less' : 'Show More'}
              <FiChevronDown className={`transform transition-transform ${showAllSuggestions ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <Card className="flex flex-col items-center justify-center py-16 text-center">
    <div className="bg-gray-50 p-4 rounded-full mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 max-w-sm">{description}</p>
  </Card>
);

// LinkedIn-style Connection Card Component
const LinkedInConnectionCard: React.FC<{
  connection: Connection;
  onRemove: (id: string) => void;
}> = ({ connection, onRemove }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="p-4 hover:bg-gray-50/50 transition-colors group">
      <div className="flex items-center gap-4">
        <Image
          src={connection.avatar}
          alt={connection.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className={`${THEME.components.typography.cardTitle} mb-0.5`}>
            {connection.name}
          </h3>
          <p className={`${THEME.components.typography.body} line-clamp-1`}>
            {connection.title}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Connected {connection.connectedDate || 'Recently'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className={`${THEME.components.button.primary} px-5 py-2 text-sm flex items-center gap-2 shadow-sm`}>
            <FiMessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Message</span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            >
              <FiMoreHorizontal className="w-5 h-5" />
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
                  <button
                    onClick={() => {
                      onRemove(connection.id);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Remove connection
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Request Card Component
const RequestCard: React.FC<{
  request: ConnectionRequest;
  onAccept: (id: string) => void;
  onIgnore: (id: string) => void;
}> = ({ request, onAccept, onIgnore }) => {
  return (
    <div className="bg-white rounded-[1.25rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E8E4FF] flex flex-col h-full group">
      <div className="h-20 bg-gradient-to-r from-primary to-gradient-end relative">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden p-0.5">
            <Image
              src={request.avatar}
              alt={request.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="pt-12 px-5 pb-5 flex flex-col items-center text-center flex-1">
        <h3 className="text-base font-bold text-[#222] mb-1">{request.name}</h3>
        <p className="text-xs text-[#666] line-clamp-2 mb-3 h-8">{request.title}</p>
        <p className="text-[10px] text-[#999] mb-4 flex items-center gap-1 bg-light-bg px-2 py-1 rounded-full">
          <FiUsers className="w-3 h-3" />
          {request.mutualConnections} mutual connections
        </p>
        
        <div className="flex gap-1 w-full mt-auto">
          <ConnectButton
            onClick={() => onAccept(request.id)}
            variant="outline"
            label="Accept"
            className="flex-1 justify-center !px-1 !text-xs"
            icon={<FiCheck size={14} />}
          />
          <ConnectButton
            onClick={() => onIgnore(request.id)}
            variant="ghost"
            label="Ignore"
            className="flex-1 justify-center !text-gray-500 hover:!bg-gray-50 shadow-none border border-gray-100 !px-1 !text-xs"
            icon={<FiX size={14} />}
          />
        </div>
      </div>
    </div>
  );
};

// Suggestion Card Component
const SuggestionCard: React.FC<{
  person: PeopleYouMayKnow;
  onConnect: (id: string) => void;
}> = ({ person, onConnect }) => {
  return (
    <div className="bg-white rounded-[1.25rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E8E4FF] flex flex-col h-full group">
      <div className={`h-20 bg-gradient-to-r ${THEME.colors.gradient.sky} relative`}>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden p-0.5">
            <Image
              src={person.avatar}
              alt={person.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="pt-12 px-5 pb-5 flex flex-col items-center text-center flex-1">
        <h3 className="text-base font-bold text-[#222] mb-1">{person.name}</h3>
        <p className="text-xs text-[#666] line-clamp-2 mb-2 h-8">{person.title}</p>
        <p className="text-[10px] text-[#999] mb-4 flex items-center gap-1 bg-light-bg px-2 py-1 rounded-full">
          <FiUsers className="w-3 h-3" />
          {person.mutualConnections} mutual connections
        </p>
        
        <ConnectButton
          onClick={() => onConnect(person.id)}
          variant="outline"
          label="Connect"
          className="w-full justify-center"
          icon={<FiUserPlus size={16} />}
        />
      </div>
    </div>
  );
};

// Sent Request Card Component
const SentRequestCard: React.FC<{
  request: Connection;
  onWithdraw: (id: string) => void;
}> = ({ request, onWithdraw }) => {
  return (
    <div className="bg-white rounded-[1.25rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E8E4FF] flex flex-col h-full group">
      <div className="h-20 bg-gradient-to-r from-orange-400 to-red-400 relative">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden p-0.5">
            <Image
              src={request.avatar}
              alt={request.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="pt-12 px-5 pb-5 flex flex-col items-center text-center flex-1">
        <h3 className="text-base font-bold text-[#222] mb-1">{request.name}</h3>
        <p className="text-xs text-[#666] line-clamp-2 mb-2 h-8">{request.title}</p>
        <p className="text-[10px] text-[#999] mb-4 bg-gray-50 px-2 py-1 rounded-full">
          Request sent
        </p>
        
        <ConnectButton
          onClick={() => onWithdraw(request.id)}
          variant="ghost"
          label="Withdraw"
          className="w-full justify-center !text-gray-500 hover:!bg-gray-50 hover:!text-red-600 hover:!border-red-200 border border-gray-100"
          icon={<FiX size={16} />}
        />
      </div>
    </div>
  );
};

// Reusable Scrollable Section Wrapper

import ScrollableSection from "@/components/shared/ScrollableSection";

// Reusable Scrollable Section Wrapper - Removed local definition



export default Connections;
