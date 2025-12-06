"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiBell,
  FiMail,
  FiUsers,
  FiBriefcase,
  FiStar,
  FiHeart,
  FiMessageCircle,
  FiUserPlus,
  FiTrendingUp,
  FiSettings,
  FiCheck,
  FiX,
  FiMoreHorizontal,
  FiClock,
  FiFilter,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { THEME } from "@/styles/theme";

interface Notification {
  id: string;
  type: "job" | "network" | "message" | "achievement" | "system";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  isImportant: boolean;
  actionRequired?: boolean;
  avatar?: string;
  company?: string;
}

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread" | "important" | "job" | "network"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "job",
      title: "New Job Match Found",
      description:
        "Senior React Developer at Microsoft matches your profile 95%",
      time: "2 minutes ago",
      isRead: false,
      isImportant: true,
      actionRequired: true,
      company: "Microsoft",
    },
    {
      id: "2",
      type: "network",
      title: "Connection Request",
      description: "Sarah Johnson wants to connect with you",
      time: "15 minutes ago",
      isRead: false,
      isImportant: false,
      actionRequired: true,
      avatar: "SJ",
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      description:
        "Recruiter from Google sent you a message about Frontend Developer position",
      time: "1 hour ago",
      isRead: false,
      isImportant: true,
      company: "Google",
    },
    {
      id: "4",
      type: "achievement",
      title: "Profile Milestone",
      description: "Your profile has been viewed 100+ times this week!",
      time: "2 hours ago",
      isRead: true,
      isImportant: false,
    },
    {
      id: "5",
      type: "job",
      title: "Application Update",
      description:
        "Your application for Full Stack Developer at Amazon is under review",
      time: "4 hours ago",
      isRead: true,
      isImportant: false,
      company: "Amazon",
    },
    {
      id: "6",
      type: "network",
      title: "Profile View",
      description: "Tech Lead at Flipkart viewed your profile",
      time: "6 hours ago",
      isRead: true,
      isImportant: false,
      company: "Flipkart",
    },
    {
      id: "7",
      type: "system",
      title: "Weekly Summary",
      description: "Your weekly activity report is ready to view",
      time: "1 day ago",
      isRead: true,
      isImportant: false,
    },
    {
      id: "8",
      type: "job",
      title: "Salary Insights",
      description:
        "New salary data available for React Developers in Bangalore",
      time: "2 days ago",
      isRead: true,
      isImportant: false,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job":
        return <FiBriefcase size={20} className="text-blue-600" />;
      case "network":
        return <FiUsers size={20} className="text-green-600" />;
      case "message":
        return <FiMail size={20} className="text-purple-600" />;
      case "achievement":
        return <FiStar size={20} className="text-yellow-600" />;
      case "system":
        return <FiBell size={20} className="text-gray-600" />;
      default:
        return <FiBell size={20} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-600";
      case "network":
        return "bg-green-100 text-green-600";
      case "message":
        return "bg-purple-100 text-purple-600";
      case "achievement":
        return "bg-yellow-100 text-yellow-600";
      case "system":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "unread" && !notif.isRead) ||
      (activeFilter === "important" && notif.isImportant) ||
      (activeFilter === "job" && notif.type === "job") ||
      (activeFilter === "network" && notif.type === "network");

    const matchesSearch =
      searchQuery === "" ||
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const importantCount = notifications.filter(
    (n) => n.isImportant && !n.isRead,
  ).length;

  return (
    <div className={`min-h-screen ${THEME.colors.background.page} p-4 md:p-6 lg:p-8 mt-[50px]`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className={`${THEME.components.typography.sectionTitle} text-3xl md:text-4xl text-primary mb-2`}>
                Notifications
              </h1>
              <p className={`${THEME.components.typography.body} text-lg`}>
                Stay updated with your professional activities
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={markAllAsRead}
                className="px-4 py-2 rounded-lg"
              >
                Mark All Read
              </Button>
              <Button variant="outline" size="icon" className="p-2 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-300 bg-white w-auto h-auto">
                <FiSettings size={20} className="text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4" noPadding>
            <div className="flex items-center gap-2 mb-2">
              <FiBell size={16} className="text-primary" />
              <span className={THEME.components.typography.caption}>Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {notifications.length}
            </div>
          </Card>

          <Card className="p-4" noPadding>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className={THEME.components.typography.caption}>Unread</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
          </Card>

          <Card className="p-4" noPadding>
            <div className="flex items-center gap-2 mb-2">
              <FiStar size={16} className="text-yellow-500" />
              <span className={THEME.components.typography.caption}>Important</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {importantCount}
            </div>
          </Card>

          <Card className="p-4" noPadding>
            <div className="flex items-center gap-2 mb-2">
              <FiClock size={16} className="text-green-500" />
              <span className={THEME.components.typography.caption}>Today</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {
                notifications.filter(
                  (n) => n.time.includes("hour") || n.time.includes("minute"),
                ).length
              }
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6" noPadding>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={THEME.components.input.search}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
              {[
                { key: "all", label: "All", icon: <FiBell size={16} /> },
                {
                  key: "unread",
                  label: "Unread",
                  icon: <div className="w-2 h-2 rounded-full bg-red-500"></div>,
                },
                {
                  key: "important",
                  label: "Important",
                  icon: <FiStar size={16} />,
                },
                { key: "job", label: "Jobs", icon: <FiBriefcase size={16} /> },
                {
                  key: "network",
                  label: "Network",
                  icon: <FiUsers size={16} />,
                },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as any)}
                  variant={activeFilter === filter.key ? 'primary' : 'ghost'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                    activeFilter === filter.key
                      ? ''
                      : "bg-gray-50 text-gray-600 hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center" noPadding>
              <FiBell size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className={`${THEME.components.typography.sectionTitle} text-xl mb-2`}>
                No notifications found
              </h3>
              <p className={THEME.components.typography.body}>
                Try adjusting your filters or search query
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  notification.isRead
                    ? "bg-white"
                    : "bg-gradient-to-r from-white to-primary/5 border-l-4 border-l-primary"
                }`}
                noPadding
              >
                <div className="flex gap-4">
                  {/* Icon/Avatar */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center">
                        {notification.avatar}
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className={`font-bold ${notification.isRead ? "text-gray-600" : "text-gray-900"}`}
                        >
                          {notification.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(notification.type)}`}
                        >
                          {notification.type.toUpperCase()}
                        </span>
                        {notification.isImportant && (
                          <FiStar
                            size={14}
                            className="text-yellow-500 fill-current"
                          />
                        )}
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 whitespace-nowrap">
                          {notification.time}
                        </span>
                        <div className="flex gap-1">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-1 hover:bg-gray-100 rounded transition-colors duration-300 w-auto h-auto"
                              title="Mark as read"
                            >
                              <FiCheck size={16} className="text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 hover:bg-red-50 rounded transition-colors duration-300 w-auto h-auto"
                            title="Delete"
                          >
                            <FiX size={16} className="text-red-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="p-1 hover:bg-gray-100 rounded transition-colors duration-300 w-auto h-auto">
                            <FiMoreHorizontal
                              size={16}
                              className="text-gray-600"
                            />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`mb-3 ${notification.isRead ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {notification.description}
                    </p>

                    {notification.company && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex items-center justify-center">
                          {notification.company.substring(0, 1)}
                        </div>
                        <span className="text-sm text-primary font-medium">
                          {notification.company}
                        </span>
                      </div>
                    )}

                    {notification.actionRequired && (
                      <div className="flex gap-3">
                        <Button className="px-4 py-2 rounded-lg text-sm">
                          {notification.type === "network"
                            ? "Accept"
                            : "View Details"}
                        </Button>
                        {notification.type === "network" && (
                          <Button variant="outline" className="px-4 py-2 border border-gray-200 rounded-lg hover:border-primary text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                            Decline
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-6 py-3 border border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 text-gray-600 hover:text-primary transition-all duration-300">
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
