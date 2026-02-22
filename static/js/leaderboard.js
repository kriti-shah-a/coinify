/**
 * Coinify Arcade Leaderboard – localStorage only
 * Keys: coinify_leaderboard (array), coinify_player_name (string)
 */
(function () {
  var LEADERBOARD_KEY = 'coinify_leaderboard';
  var PLAYER_NAME_KEY = 'coinify_player_name';
  var MAX_ENTRIES = 50;

  function getLeaderboard() {
    try {
      var raw = localStorage.getItem(LEADERBOARD_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function setLeaderboard(arr) {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  window.getPlayerName = function () {
    return localStorage.getItem(PLAYER_NAME_KEY) || '';
  };

  window.setPlayerName = function (name) {
    var n = (name || '').trim();
    if (n) localStorage.setItem(PLAYER_NAME_KEY, n);
    return n;
  };

  window.getLeaderboard = getLeaderboard;

  /**
   * Add a score entry. Merges with existing by name (keeps highest score per name).
   * @param {string} name - Player name
   * @param {number} points - Score to add
   */
  window.addScore = function (name, points) {
    var n = (name || '').trim();
    if (!n || typeof points !== 'number' || points < 0) return;
    var list = getLeaderboard();
    var now = new Date().toISOString();
    var found = list.find(function (e) { return e.name === n; });
    if (found) {
      found.score = Math.max(found.score, points);
      found.updatedAt = now;
    } else {
      list.push({ name: n, score: points, updatedAt: now });
    }
    list.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
    list = list.slice(0, MAX_ENTRIES);
    setLeaderboard(list);
  };

  /**
   * Render leaderboard into an element. Pass id of container or DOM element.
   */
  window.renderLeaderboard = function (containerIdOrEl) {
    var el = typeof containerIdOrEl === 'string'
      ? document.getElementById(containerIdOrEl)
      : containerIdOrEl;
    if (!el) return;
    var list = getLeaderboard();
    if (list.length === 0) {
      el.innerHTML = '<p class="text-sm text-gray-500 italic">No scores yet. Play a game and save your score!</p>';
      return;
    }
    el.innerHTML = '<ol class="space-y-2">' + list.slice(0, 20).map(function (e, i) {
      var rank = i + 1;
      var medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank + '.';
      return '<li class="flex justify-between items-center vellum-card px-4 py-2 rounded-xl">' +
        '<span class="font-semibold text-zinc-800">' + medal + ' ' + escapeHtml(e.name) + '</span>' +
        '<span class="mono text-[#8332ac] font-bold">' + (e.score || 0) + ' pts</span>' +
        '</li>';
    }).join('') + '</ol>';
  };

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
})();
