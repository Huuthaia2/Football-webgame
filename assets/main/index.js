window.__require = function e(t, n, a) {
	function i(s, r) {
		if (!n[s]) {
			if (!t[s]) {
				var l = s.split("/");
				if (l = l[l.length - 1], !t[l]) {
					var c = "function" == typeof __require && __require;
					if (!r && c) return c(l, !0);
					if (o) return o(l, !0);
					throw new Error("Cannot find module '" + s + "'")
				}
				s = l
			}
			var h = n[s] = {
				exports: {}
			};
			t[s][0].call(h.exports, function(e) {
				return i(t[s][1][e] || e)
			}, h, h.exports, e, t, n, a)
		}
		return n[s].exports
	}
	for (var o = "function" == typeof __require && __require, s = 0; s < a.length; s++) i(a[s]);
	return i
}({
	Engine: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9441dEz/TFL8qA9JYHWuCzT", "Engine");
		var n = e("GameSound"),
			a = e("GameTime"),
			i = e("GameData"),
			o = e("GameAdapterInfo"),
			s = e("GameLog"),
			r = e("GameBackgroundLoad"),
			l = e("GameMemoryManagement"),
			c = e("GameTool"),
			h = e("GameEventManager");
		window.initEngine = function() {
			null == window.engine && (window.engine = new d, engine.initialize())
		};
		var d = cc.Class({
			properties: {
				isInit: null,
				gameSound: null,
				gameTime: null,
				gameData: null,
				userData: null,
				gameAdapterInfo: null,
				gameBackgroundLoad: null,
				gameMemoryManagement: null,
				gameTool: null,
				gameEventManager: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.gameSound = new n, this.gameSound.initialize(), this.gameTime = new a, this.gameTime.initialize(), this.gameData = new i, this.gameData.initialize(), this.gameAdapterInfo = new o, this.gameAdapterInfo.initialize(), this.gameLog = new s, this.gameLog.initialize(), this.gameBackgroundLoad = new r, this.gameBackgroundLoad.initialize(), this.gameMemoryManagement = new l, this.gameMemoryManagement.initialize(), this.gameTool = new c, this.gameTool.initialize(), this.gameEventManager = new h, this.gameEventManager.initialize(), window.ccLog = function() {
					for (var e = 0; e < arguments.length; e++) console.log(e < 0 || arguments.length <= e ? void 0 : arguments[e])
				}, ccLog("\u5f15\u64ce\u7248\u672c20190418_1"))
			}
		});
		cc._RF.pop()
	}, {
		GameAdapterInfo: "GameAdapterInfo",
		GameBackgroundLoad: "GameBackgroundLoad",
		GameData: "GameData",
		GameEventManager: "GameEventManager",
		GameLog: "GameLog",
		GameMemoryManagement: "GameMemoryManagement",
		GameSound: "GameSound",
		GameTime: "GameTime",
		GameTool: "GameTool"
	}],
	FaceBookAdvertisement: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5d59dfd3exFQZV67lt/RN4K", "FaceBookAdvertisement"), cc.Class({
			extends: cc.Component,
			properties: {
				hasRemoveAD: null,
				isLoadInterstitialAD: null,
				loadedInterstitialAD: null,
				loadInterstitialADOne: null,
				errorLoadInterstitialCount: null,
				interstitialKeyArr: null,
				isPlayInterstitialAD: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.isLoadInterstitialAD = !1, this.loadInterstitialADOne = !1, this.isPlayInterstitialAD = !1, this.errorLoadInterstitialCount = 0, this.interstitialKeyArr = [], interstitialAdKeyList.length > 0 && this.schedule(this.loadInterstitial, 33))
			},
			loadInterstitial: function() {
				1 != this.hasRemoveAD && (1 != this.isPlayInterstitialAD ? 1 != this.isLoadInterstitialAD && null == this.loadedInterstitialAD && (this.errorLoadInterstitialCount >= 3 ? 1 == this.loadInterstitialADOne && (this.loadInterstitialADOne = !1, this.preLoadInterstitialAD()) : (this.loadInterstitialADOne = !1, this.preLoadInterstitialAD())) : this.isPlayInterstitialAD = !1)
			},
			preLoadInterstitialAD: function() {
				switch (gameSDKName) {
					case faceBookSDK:
						this.isLoadInterstitialAD = !0, this.interstitialKeyArr.length <= 0 && (this.interstitialKeyArr = interstitialAdKeyList.slice(), this.interstitialKeyArr.sort(function() {
							return Math.random() - .5
						}));
						var e, t = this.interstitialKeyArr.shift(),
							n = this;
						FBInstant.getInterstitialAdAsync(t).then(function(n) {
							return ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a" + t), (e = n).loadAsync()
						}).then(function() {
							ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u6210\u529f"), n.loadedInterstitialAD = e, n.isLoadInterstitialAD = !1
						}).catch(function(e) {
							n.isLoadInterstitialAD = !1, n.errorLoadInterstitialCount++, ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" + e.message), ccLog(e.code)
						});
						break;
					case faceBookSDKTest:
				}
			},
			showInterstitialAD: function(e, t, n) {
				if (this.hasRemoveAD) null != t && t();
				else switch (gameSDKName) {
					case faceBookSDK:
						var a = this;
						a.loadInterstitialADOne = !0, null != a.loadedInterstitialAD ? a.loadedInterstitialAD.showAsync().then(function() {
							ccLog("InterstitialAd\u5e7f\u544a\u663e\u793a\u6210\u529f"), null != t && t(), a.loadedInterstitialAD = null, a.isPlayInterstitialAD = !0
						}).catch(function(e) {
							a.loadedInterstitialAD = null, a.isPlayInterstitialAD = !0, a.errorLoadInterstitialCount++, ccLog("\u52a0\u8f7d\u63d2\u5c4f\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" + e.message), ccLog(e.code), null != n && n()
						}) : null != n && n();
						break;
					case faceBookSDKTest:
						setTimeout(function() {
							null != t && t()
						}, 1e3)
				}
			},
			showRewardVideoAd: function() {
				var e = arguments;
				this.realShowRewardVideoAd.apply(null, e)
			},
			realShowRewardVideoAd: function(e, t) {
				if (cc.log("\u5c1d\u8bd5\u64ad\u653e\u5e7f\u544a:", e, t), CFG.forFBCheck) createGameSureTitleWindow();
				else switch (gameSDKName) {
					case faceBookSDK:
						var n = null;
						// addLoadingCircle(), 
                        FBInstant.getRewardedVideoAsync(e).then(function(e) {
							return ccLog("RewardedVideo\u5f00\u59cb\u52a0\u8f7d"), (n = e).loadAsync()
						}).then(function() {
							return ccLog("RewardedVideo\u52a0\u8f7d\u6210\u529f\u56de\u8c03"), n.showAsync()
						}).then(function() {
							ccLog("RewardedVideo\u5e7f\u544a\u663e\u793a\u6210\u529f"), removeLoadingCircle(), null != t && t()
						}).catch(function(e) {
							removeLoadingCircle(), createGameSureTitleWindow(), ccLog("RewardedVideo\u5e7f\u544a\u663e\u793a\u5931\u8d25"), ccLog("RewardedVideo\u5e7f\u544a\u663e\u793a\u5931\u8d25-------------------", e)
						});
						break;
					case faceBookSDKTest:
						null != t && t()
				}
			}
		}), cc._RF.pop()
	}, {}],
	FaceBookBot: [function(e, t) {
		"use strict";
		cc._RF.push(t, "915e42h7aVGgJvWdGeUBVkZ", "FaceBookBot"), cc.Class({
			extends: cc.Class,
			properties: {
				getSubscribeBotCount: null
			},
			initialize: function() {
				this.getSubscribeBotCount = 0
			},
			canSubscribeBotAsync: function(e) {
				switch (gameSDKName) {
					case faceBookSDKTest:
						null != e && e();
						break;
					case faceBookSDK:
						this.getSubscribeBotCount = this.getSubscribeBotCount + 1;
						var t = this;
						FBInstant.player.getDataAsync(["bot"]).then(function(n) {
							ccLog("\u83b7\u53d6\u5230\u7684data:"), ccLog(n);
							var a = engine.gameTime.getDayToString();
							null != n && null != n.bot && n.bot == a || (ccLog("\u8c03\u7528canSubscribeBotAsync\u3002"), FBInstant.player.canSubscribeBotAsync().then(function(t) {
								ccLog("\u8c03\u7528canSubscribeBotAsync\u6210\u529f\u3002"), ccLog(t), 1 == t ? (gameSDK.logEvent("canSubscribe", 1, {
									canSubscribe: "canSubscribe"
								}), null != e && e()) : gameSDK.logEvent("yijingxuanzedingyue", 1, {
									yijingxuanzedingyue: "yijingxuanzedingyue"
								})
							}).catch(function() {
								1 == gameSDK.sdkPlayInfo.isNewPlayer ? (gameSDK.logEvent("aotuopen_toofast", 1, {
									aotuopen_toofast: "aotuopen_toofast"
								}), t.getSubscribeBotCount < 4 ? setTimeout(function() {
									t.canSubscribeBotAsync(e)
								}, 100) : gameSDK.logEvent("try3fail", 1, {
									try3fail: "try3fail"
								})) : gameSDK.logEvent("yijingxuanzedingyue", 1, {
									yijingxuanzedingyue: "yijingxuanzedingyue"
								})
							}))
						})
				}
			},
			subscribeBotAsync: function(e, t) {
				var n = this;
				switch (gameSDKName) {
					case faceBookSDKTest:
						null != e && e();
						break;
					case faceBookSDK:
						ccLog("\u8c03\u7528subscribeBotAsync\u3002"), FBInstant.player.subscribeBotAsync().then(function() {
							n.canSubscribeBot = !1, gameSDK.logEvent("dingyuedakai", 1, {
								dingyuedakai: "dingyuedakai"
							}), ccLog("\u8ba2\u9605Bot\u3002");
							var t = engine.gameTime.getDayToString();
							FBInstant.player.setDataAsync({
								bot: t
							}).then(function() {}), null != e && e()
						}).catch(function() {
							n.canSubscribeBot = !1, gameSDK.logEvent("dingyueguanbi", 1, {
								dingyueguanbi: "dingyueguanbi"
							}), ccLog("\u53d6\u6d88\u8ba2\u9605Bot\u3002");
							var e = engine.gameTime.getDayToString();
							FBInstant.player.setDataAsync({
								bot: e
							}).then(function() {}), null != t && t()
						})
				}
			},
			sendMessengerRobot: function(e) {
				switch (gameSDKName) {
					case faceBookSDKTest:
						null != e && e();
						break;
					case faceBookSDK:
						FBInstant.setSessionData(getBotData())
				}
			}
		}), cc._RF.pop()
	}, {}],
	FaceBookLeaderboard: [function(e, t) {
		"use strict";
		cc._RF.push(t, "550b09e/3hNiaMA63bu6gVL", "FaceBookLeaderboard");
		var n = [3e3, 2500, 2e3, 1600, 1200, 800, 500, 300, 150, 60],
			a = [50, 500];
		cc.Class({
			properties: {},
			initialize: function() {},
			getRankData: function(e) {
				var t = this,
					n = 0;
				if (rankData.length > 0) {
					if (o) {
						for (n = 0; n < rankData.length; n++) o[rankData[n].playerID] && (rankData[n].score = o[rankData[n].playerID]);
						rankData.sort(function(e, t) {
							return t.score - e.score
						})
					}
					for (n = 0; n < rankData.length; n++) rankData[n].rank = n + 1;
					e(rankData)
				} else setTimeout(function() {
					t.getRankData(e)
				}, 200)
			},
			setScoreAsync: function(e) {
				cc.log("\u5c1d\u8bd5\u4e0a\u4f20\u65b0\u7684\u5206\u6570", e), i = Math.max(i, e), rankData.length > 0 && this._flushRankData(), o = {}, this._getfriendsList(), this._checkNeedSetRealRankData()
			},
			getPassPerson: function() {
				var e = friendsList || [];
				if (e.length < 7) {
					var t = this._getRandomBotArr(7 - e.length);
					e = e.concat(t)
				}
				return this._deepCopy(e)
			},
			_checkNeedSetRealRankData: function() {
				var e = this;
				gameSDKName === faceBookSDK && null != FBInstant.context.getID() && FBInstant.getLeaderboardAsync("FB_game_1." + FBInstant.context.getID()).then(function(e) {
					return ccLog("update my score"), e.setScoreAsync(i)
				}).then(function() {
					ccLog("update suc,get leadbord"), e._getRealRank()
				}).catch(function(e) {
					cc.error("\u4e0a\u4f20\u6392\u884c\u699c\u5931\u8d25", e)
				})
			},
			_getRealRank: function() {
				gameSDKName === faceBookSDK && null != FBInstant.context.getID() && FBInstant.getLeaderboardAsync("FB_game_1." + FBInstant.context.getID()).then(function(e) {
					return e.getConnectedPlayerEntriesAsync(10)
				}).then(function(e) {
					if (ccLog("getEntriesAsync suc:"), o = {}, null != e && e.length > 0)
						for (var t = 0; t < e.length; t++) {
							var n = {};
							n.playerID = e[t].getPlayer().getID(), n.photo = e[t].getPlayer().getPhoto(), n.name = e[t].getPlayer().getName(), n.score = e[t].getScore(), n.rank = e[t].getRank(), ccLog(n.name), Number(n.score) >= 5e5 || (o[n.playerID] = n.score)
						}
					cc.log("\u771f\u5b9erank\u6570\u636e:", o)
				}).catch(function(e) {
					ccLog("update leaderbord fail"), ccLog(e)
				})
			},
			_getfriendsList: function() {
				var e = this;
				switch (this._getfriendsList = function() {}, gameSDKName) {
					case faceBookSDK:
						FBInstant.player.getConnectedPlayersAsync().then(function(t) {
							friendsList = [];
							for (var n = 0; n < t.length; n++) {
								var a = t[n],
									i = {};
								i.name = a.getName(), i.playerID = a.getID(), i.photo = a.getPhoto(), friendsList.push(i)
							}
							e._buildUnrealRank()
						}).catch(function(e) {
							ccLog("get friend fail"), ccLog(e)
						});
						break;
					case faceBookSDKTest:
						setTimeout(function() {
							friendsList = e._getRandomBotArr(7), e._buildUnrealRank()
						}, 2e3)
				}
			},
			_buildUnrealRank: function() {
				var e = [],
					t = [],
					o = i,
					s = i,
					r = 0,
					l = 0;
				for (l = 0; l < n.length && !(i >= n[l]); l++);
				for ((r = l) === n.length && (r = 100), l = r - 1; l >= 0; l--) e.push(o += parseInt(a[0] + a[1] * Math.random()));
				for (l = 0; l < 100; l++) t.push((s -= parseInt(a[0] + a[1] * Math.random()), s = Math.max(0, s)));
				var c = this._deepCopy(friendsList);
				c = this._shuffleArray(c), rankData.push({
					playerID: gameSDK.sdkPlayInfo.playerID,
					name: gameSDK.sdkPlayInfo.name,
					photo: gameSDK.sdkPlayInfo.photo,
					score: i
				});
				var h, d = Math.min(c.length, r);
				for (l = 0; l < d; l++)(h = c.shift()).score = e.shift(), rankData.push(h);
				rankData.reverse();
				var u = c.length;
				for (l = 0; l < u; l++)(h = c.shift()).score = t.shift(), rankData.push(h);
				cc.log("\u6392\u884c\u699c\u6570\u636e", rankData)
			},
			_flushRankData: function() {
				for (var e = 0; e < rankData.length; e++)
					if (rankData[e].playerID === gameSDK.sdkPlayInfo.playerID) {
						rankData[e].score = i;
						break
					} rankData.sort(function(e, t) {
					return t.score - e.score
				})
			},
			_getRandomBotArr: function(e) {
				for (var t = ["Max Julia", "Nathan Anthony", "Asa Webb", "Phil Harrison", "Diana Hoyle", "Gloria Nelly", "Rodney Warner", "Eunice Peggy", "Henry Katrine", "Oscar Anderson", "Glenn Cocker", "Kerr Reade", "Lindsay Gill,", "Vito Hobbes", "Andy Hugh", "Elroy MacAdam", "Ternence Emma", "Ruth Harrington", "Sam Carmen", "Yvette Spenser", "Joy Eve", "Erin Christ", "Omar Maxwell", "Devin Theresa", "Godfery Collins", "Edwiin Becky", "Christopher Pop", "Aldrich White", "June Margery", "Dominic Larkin", "Jason Carllyle", "Armand Flower", "Ian Hughes", "Rex Burke", "Crystal Peg", "Quintina Petty", "Myron Yule", "Kay Noel", "Linda Felix", "Abel Smith", "Irene Fast", "Ruth Nell", "Wade Kit", "Ivy Grant", "Tom Pope", "Sibyl Rhodes", "Noel Lawrence", "Charles Edward", "Kirk Finn", "Ophelia Peter", "Candice Wild", "Bblythe Eveline", "Mary Philemon", "Grace Beerbohm", "Brian Rayleign", "Oscar Mark", "Will Carroll", "Cora Garcia", "Truman Kennedy", "Maurice Fanny", "Booth Birrell", "Eve DuBois", "Edwina Theresa", "Marsh Roland", "Salome Malan", "Ryan Ellis", "Morgan Chris", "Byron Tracy", "Eric Bertie", "Hazel Evan", "Chad Ferguson", "Dolores Adolph", "Ira Bell", "Basil Moses", "Eartha Lawson", "Lucien Harper", "Ivan Bulwer", "Gloria Jim", "Anna Aldridge", "Wilbur Dunlop", "Yale Bob", "Roberta Dewar", "Jo Bruce", "Simon Wallace", "Abel Christy", "Otis Copper", "Elva Sheridan", "Edison Horatio", "Christian Coco", "Betty Pater", "Janet Beaufort", "Norma Matthew", "Payne Anto", "Bertram Dewey", "Vera Ingersoll", "Vincent Holmes", "Jamie Lucy", "Aaron Ramsden", "Buck Daisy", "Howar Louisa", "Yvonne Wallis", "Nathan Oliver", "Ada Clara", "Caesar Henry", "Cynthia Noyes", "Nathaniel Leo", "Griffith Marcus", "Tabitha Pulit", "Chad Hewlett", "Patricia Yerkes", "Jennifer Nahum", "Alston Sophia", "Brian Martin", "Leif Hamilton", "Mike Conrad", "Coral Gus", "Matthew Isaac", "Broderick Joe", "Harold Cover", "Orville McCar", "Lena Giles", "Giles Anna", "Sophia Joyce", "Clare Carpenter", "Tab Yeates", "Jacqueline Cra", "Alvin MacArthur", "Alvis Garcia", "Omar Salome", "Maud Ferguson", "Eudora Cotton", "Lennon Dickens", "Robin Toby", "Zora Buck", "Tony Camilla", "Hedy Wordsworth", "Lesley Morgan", "Devin Maud", "Isidore Palmer", "Benson Scripps", "Phil Webster", "Hyman Pearson", "Magee", "Hilary Martha", "Grace Noah", "Arm Ernest", "Wendell Abraham", "Adair Acheson", "Betsy Larkin", "Marshall Walton", "Rex Bertha", "Nicole Harrod", "Arm Elinor", "Audrey Swin", "Elvira Tommy", "Roxanne Eveline", "Newman Bess", "Dominic Wood", "Nat Anderson", "Nelly James", "Gabriel Grote", "Joseph Darwin", "Gloria Joan", "Hubery Conan", "Tyrone Marion", "Sabina Dickey", "Emma Ernest", "Avery Raglan", "Maxine Sharp", "Sarah Felix", "Alfred Isabel", "Wright Gall", "Evange Lucius", "Burnell Gal", "Zoe Kennedy", "Gwend Oliver", "Alexia Ted", "Blanche Chaplin", "Aries Bell", "Dolores Lincoln", "Ulysses Guy", "Barnett Nick", "Yale Julian", "Wade Peter", "Benjamin Donne", "Miranda Douglas", "Jim Marshall", "Richard Van", "Saxon Leopold", "Ralap Milton", "Dave Surrey", "Emily Barney", "Thomas Christ", "Cliff Thoreau", "Jenny Quiller", "Marina Aldridge", "Augus Abe", "Quinn Irving", "Alice Zacharias", "Winifred Troll", "There Euphemia", "Mandy Spring", "Ida Dewar", "Geoffrey Parker", "Zenobia Gunther", "Raymond Carroll", "Jill Wilde", "Jacqueline Hugh", "Edwiin Eisen", "Lucien Henri", "Ingrid Patience", "Victor Wilhel", "Marvin Jennings", "Teresa Maria", "Faithe Rob", "Cherry Morrison", "Sandy Wagner"], n = []; n.length < e;) {
					var a = ~~(Math.random() * t.length); - 1 === n.indexOf(t[a]) && n.push(t[a])
				}
				var i, o = [];
				for (i = 0; i < e; i++) o.push(i);
				o = this._shuffleArray(o);
				var s = [];
				for (i = 0; i < o.length; i++) s.push({
					playerID: i + 100,
					name: n[i],
					photo: "bot" + (o[i] + 1),
					score: 1e3 * i + 50
				});
				return s
			},
			_shuffleArray: function(e) {
				for (var t, n, a = e.length; a;) n = Math.floor(Math.random() * a--), t = e[a], e[a] = e[n], e[n] = t;
				return e
			},
			_deepCopy: function(e) {
				var t = e.constructor === Array ? [] : {};
				if ("object" == typeof e) {
					for (var n in e) t[n] = "object" == typeof e[n] ? this._deepCopy(e[n]) : e[n];
					return t
				}
			}
		}), window.friendsList = null, window.rankData = [];
		var i = 0,
			o = null;
		cc._RF.pop()
	}, {}],
	FaceBookPayment: [function(e, t) {
		"use strict";
		cc._RF.push(t, "fdc08nlhG9McY86i/6mkdk6", "FaceBookPayment"), cc.Class({
			properties: {
				supplementPropList: null,
				isCanPayment: null
			},
			initialize: function() {
				this.supplementPropList = [], this.isCanPayment = !0
			},
			getPayList: function() {
				switch (gameSDKName) {
					case faceBookSDK:
						return;
					case faceBookSDKTest:
						this.isCanPayment = !0, ccLog("\u53ef\u4ee5\u53d1\u8d77\u652f\u4ed8"), this.checkPaymentStatus()
				}
			},
			checkPaymentStatus: function() {
				switch (gameSDKName) {
					case faceBookSDKTest:
						getSupplementTestData(this);
						break;
					case faceBookSDK:
						var e = this;
						if (0 == this.isCanPayment) return void ccLog("\u652f\u4ed8\u5e76\u6ca1\u6709\u51c6\u5907\u597d");
						FBInstant.payments.getPurchasesAsync().then(function(t) {
							t.length > 0 && (ccLog("\u6709\u672a\u6d88\u8d39\u7684\u8ba2\u5355"), e.supplementPropList = t)
						})
				}
			},
			showPay: function(e, t, n, a) {
				switch (gameSDKName) {
					case faceBookSDKTest:
						if (0 == this.isCanPayment) return ccLog("\u652f\u4ed8\u5e76\u6ca1\u6709\u51c6\u5907\u597d"), void(null != n && n());
						if (null != t) {
							var i = getPayTestData();
							t(i)
						}
						break;
					case faceBookSDK:
						if (0 == this.isCanPayment) return ccLog("\u652f\u4ed8\u5e76\u6ca1\u6709\u51c6\u5907\u597d"), void(null != n && n());
						addLoadingCircle(), FBInstant.payments.purchaseAsync({
							productID: e.payid,
							developerPayload: e.developerPayload
						}).then(function(e) {
							ccLog("\u8d2d\u4e70\u6210\u529f,\u4f7f\u5546\u54c1\u751f\u6548\u5e76\u4fdd\u5b58\u73a9\u5bb6\u4fe1\u606f"), removeLoadingCircle(), null != t && (t(e), ccLog(e))
						}).catch(function(e) {
							removeLoadingCircle(), ccLog("\u652f\u4ed8\u5931\u8d25:"), ccLog(e), "USER_INPUT" == e.code ? null != a && a() : null != n && n()
						})
				}
			},
			consumeFbItem: function(e) {
				switch (gameSDKName) {
					case faceBookSDKTest:
						ccLog("\u6e05\u9664\u5bf9\u5e94\u7684\u6d88\u8d39\u4fe1\u606f:" + e);
						break;
					case faceBookSDK:
						FBInstant.payments.consumePurchaseAsync(e).then(function() {
							ccLog("\u5546\u54c1\u6d88\u8d39\u6389\u4e86\uff1a" + e)
						})
				}
			},
			isCanPay: function() {
				return 1 != gameSDK.isIOS()
			}
		}), cc._RF.pop()
	}, {}],
	FaceBookSDK: [function(e, t) {
		"use strict";
		cc._RF.push(t, "352baTHW3pMpq/lMEUWZ/WH", "FaceBookSDK"), e("GameCustomImage");
		var n = e("FaceBookLeaderboard"),
			a = e("FaceBookUpdateAsync"),
			i = e("FaceBookAdvertisement"),
			o = e("FaceBookPayment"),
			s = e("FaceBookBot");
		window.sdkPortEm = cc.Enum({
			ios: "IOS",
			android: "ANDROID",
			web: "WEB",
			mobileWeb: "MOBILE_WEB"
		}), cc.Class({
			properties: {
				isInit: null,
				sdkPlayInfo: null,
				sdkPort: null,
				isFirstStartGame: null,
				leaderboard: null,
				faceBookUpdateAsync: null,
				faceBookAdvertisement: null,
				faceBookPayment: null,
				faceBookBot: null,
				localeInfo: null,
				_startGameFun: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.isFirstStartGame = !0, this.sdkPlayInfo = new Object, this.sdkPlayInfo.friendsList = new Object, this.sdkPort = new Object, this.leaderboard = new n, this.leaderboard.initialize(), this.faceBookUpdateAsync = new a, this.faceBookUpdateAsync.initialize(), this.faceBookAdvertisement = new i, this.faceBookAdvertisement.initialize(), this.faceBookPayment = new o, this.faceBookPayment.initialize(), this.faceBookBot = new s, this.faceBookBot.initialize())
			},
			getLocale: function() {
				switch (gameSDKName) {
					case faceBookSDK:
						this.localeInfo = "";
						break;
					case faceBookSDKTest:
						this.localeInfo = "en_US"
				}
				var e = {
						en_US: "English",
						id_ID: "Indonisian",
						vi_VN: "Vietemnese",
						hi_IN: "Hindi",
						pt_PT: "Portuguese",
						th_TH: "Thai"
					},
					t = e[this.localeInfo];
				return t || (t = e.en_US), t
			},
			isIOS: function() {
				return this.sdkPort == sdkPortEm.ios || cc.sys.os == cc.sys.OS_IOS
			},
			getPlayInfo: function(e) {
				switch (gameSDKName) {
					case faceBookSDK:
						ccLog("\u83b7\u53d6\u7528\u6237\u767b\u5f55\u4fe1\u606f\u8c03\u7528:FBInstant.initializeAsync\u51fd\u6570"), this.sdkPlayInfo.playerID = FBInstant.player.getID(), this.sdkPlayInfo.photoSpriteFrameFun = function() {
							return null
						}, ccLog("\u83b7\u53d6\u7528\u6237\u767b\u5f55\u4fe1\u606f:FBInstant.initializeAsync\u56de\u8c03:" + this.sdkPlayInfo.playerID), this.getUserData(e);
						break;
					case faceBookSDKTest:
						createTestPlayer(), this.getUserData(e)
				}
			},
			getUserData: function(e) {
				switch (gameSDKName) {
					case faceBookSDK:
						var t = this;
						this.logEvent("getDataAsync", 1, {
							getDataAsync: "getDataAsync"
						}), FBInstant.player.getDataAsync(fbSaveDataKey).then(function(n) {
							if (t.logEvent("getDataAsyncOK", 1, {
									getDataAsyncOK: "getDataAsyncOK"
								}), ccLog("\u53d6\u5230FB\u7684\u6570\u636e:"), ccLog(n), null != n) {
								var a = 0;
								for (var i in n) a++;
								0 == a && (n = null)
							}
							if (null == n) t.sdkPlayInfo.isNewPlayer = !0, e(null);
							else if (t.sdkPlayInfo.isNewPlayer = !1, 1 == fbSaveDataKey.length) e(n[fbSaveDataKey[0]]);
							else {
								var o = new Object;
								for (i = 0; i < fbSaveDataKey.length; i++) o[fbSaveDataKey[i]] = n[fbSaveDataKey[i]];
								e(o)
							}
						});
						break;
					case faceBookSDKTest:
						var n = null;
						try {
							var a = JSON.parse(cc.sys.localStorage.getItem(gameSaveDataKey));
							if (null != a)
								if (1 == fbSaveDataKey.length) n = a[fbSaveDataKey[0]];
								else {
									for (var i = new Object, o = 0; o < fbSaveDataKey.length; o++) i[fbSaveDataKey[o]] = a[fbSaveDataKey[o]];
									n = i
								}
						} catch (s) {}
						ccLog("\u53d6\u5230\u7f13\u5b58\u6570\u636e:"), ccLog(n), e(null == n ? null : n)
				}
			},
			saveUserData: function(e, t) {
				switch (gameSDKName) {
					case faceBookSDK:
						FBInstant.player.setDataAsync(e).then(function() {
							ccLog("\u6e38\u620f\u5b58\u6863\u6210\u529f\uff01"), ccLog(e), null != t && t()
						});
						break;
					case faceBookSDKTest:
						try {
							cc.sys.localStorage.setItem(gameSaveDataKey, JSON.stringify(e))
						} catch (n) {}
						null != t && t()
				}
			},
			startGame: function(e) {
				switch (gameSDKName) {
					case faceBookSDK:
						ccLog("\u83b7\u53d6\u6e38\u620fisFirstStartGame\u5c5e\u6027\uff0c\u5982\u679ctrue\u5219\u8c03\u7528FBInstant.startGameAsync\u65b9\u6cd5" + this.isFirstStartGame), 1 == this.isFirstStartGame ? (this.isFirstStartGame = !1, FBInstant.startGameAsync().then(function() {}), this._startGameFun = e, setTimeout(this._checkStartGameEnd.bind(this), 100)) : null != e && (cc.log("callfun"), e());
						break;
					case faceBookSDKTest:
						1 == this.isFirstStartGame ? (this.faceBookPayment.getPayList(), this.isFirstStartGame = !1, null != e && e()) : null != e && e()
				}
			},
			_checkStartGameEnd: function() {
				null != FBInstant.player.getName() ? (this.sdkPlayInfo.name = FBInstant.player.getName(), this.sdkPlayInfo.photo = FBInstant.player.getPhoto(), this.sdkPlayInfo.entryPointData = FBInstant.getEntryPointData(), ccLog("FBInstant.startGameAsync\u56de\u8c03\u3002\u73a9\u5bb6 name=" + this.sdkPlayInfo.name + "photo=" + this.sdkPlayInfo.photo), this.sdkPort = FBInstant.getPlatform(), ccLog(this.sdkPort), this.faceBookPayment.getPayList(), null != this._startGameFun && this._startGameFun()) : setTimeout(this._checkStartGameEnd, 100)
			},
			setLoadingProgress: function(e) {
				switch (gameSDKName) {
					case faceBookSDK:
						FBInstant.setLoadingProgress(e);
						break;
					case faceBookSDKTest:
				}
			},
			logEvent: function(e, t, n) {
				switch (ccLog("\u6253\u70b9" + e), gameSDKName) {
					case faceBookSDK:
						FBInstant.logEvent(e, t, n);
						break;
					case faceBookSDKTest:
				}
			},
			logEventByString: function(e) {
				ccLog("\u6253\u70b9" + e);
				var t = new Object;
				switch (t[e] = e, gameSDKName) {
					case faceBookSDK:
						FBInstant.logEvent(e, 1, t);
						break;
					case faceBookSDKTest:
				}
			},
			goToOtherGame: function(e) {
				switch (gameSDKName) {
					case faceBookSDK:
						FBInstant.switchGameAsync(e).then(function() {
							ccLog("\u8df3\u8f6c\u5176\u4ed6\u6e38\u620f\u6210\u529f")
						}).catch(function(t) {
							null != t && (ccLog(e, "\u8df3\u8f6c\u5176\u4ed6\u6e38\u620f\u5931\u8d25\uff0c\u5931\u8d25\u7f16\u7801\u4e3a:"), ccLog(t))
						});
						break;
					case faceBookSDKTest:
						ccLog(e, "\u8df3\u8f6c\u6210\u529f\u3002")
				}
			},
			getMessengerRobot: function(e) {
				switch (gameSDKName) {
					case faceBookSDKTest:
						return null != e && e(null), null;
					case faceBookSDK:
						var t = FBInstant.getEntryPointData();
						return null != e && e(t), t
				}
			},
			createShortcut: function(e) {
				switch (gameSDKName) {
					case faceBookSDKTest:
						ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u3002"), null != e && e(null);
						break;
					case faceBookSDK:
						ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0fsdk\u3002"), FBInstant.player.getDataAsync(["shortcut"]).then(function(t) {
							ccLog("\u83b7\u53d6\u5230\u7684data:"), ccLog(t), null != t && null != t.shortcut && 1 == t.shortcut || FBInstant.canCreateShortcutAsync().then(function(t) {
								ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0fcanCreateShortcut\uff1a" + t), t && FBInstant.createShortcutAsync().then(function() {
									FBInstant.player.setDataAsync({
										shortcut: 1
									}).then(function() {}), ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u6210\u529f\u3002"), null != e && e(null)
								}).catch(function(e) {
									ccLog("\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u5931\u8d25\u3002"), ccLog(e)
								})
							}).catch(function(e) {
								ccLog("\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u4e0d\u53ef\u4ee5\u521b\u5efa\u3002"), ccLog(e)
							})
						}).catch(function(e) {
							ccLog("\u83b7\u53d6\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u6570\u636e\u5931\u8d25\u3002"), ccLog(e)
						})
				}
			}
		}), cc._RF.pop()
	}, {
		FaceBookAdvertisement: "FaceBookAdvertisement",
		FaceBookBot: "FaceBookBot",
		FaceBookLeaderboard: "FaceBookLeaderboard",
		FaceBookPayment: "FaceBookPayment",
		FaceBookUpdateAsync: "FaceBookUpdateAsync",
		GameCustomImage: "GameCustomImage"
	}],
	FaceBookUpdateAsync: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f870fNj0m9KTYKbcSXf2Uv3", "FaceBookUpdateAsync");
		var n = e("GameCustomImage");
		cc.Class({
			properties: {},
			initialize: function() {},
			sendFaceBookFriend: function(e, t, a, i) {
				switch (gameSDKName) {
					case faceBookSDK:
						var o = this;
						ccLog("\u8c03\u7528FBInstant.context.chooseAsync\u65b9\u6cd5"), FBInstant.context.chooseAsync({
							filters: ["NEW_CONTEXT_ONLY"]
						}).then(function() {
							ccLog("\u8c03\u7528FBInstant.context.chooseAsync\u65b9\u6cd5\u56de\u8c03");
							var s = new n;
							s.initialize(e), s.drawCompleteFun = function(n) {
								ccLog("\u597d\u53cb\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u8c03\u7528FBInstant.updateAsync\u65b9\u6cd5\uff0c\u9080\u8bf7\u597d\u53cb"), FBInstant.updateAsync({
									action: "CUSTOM",
									cta: "Play",
									template: e.template,
									image: n,
									text: e.text,
									data: e.data,
									strategy: "LAST",
									notification: "PUSH"
								}).then(function() {
									null != t && (ccLog("\u9080\u8bf7\u597d\u53cb\u56de\u8c03"), t())
								}).catch(function(e) {
									o.updateAsyncError(a, i, e, "\u9080\u8bf7\u597d\u53cb")
								})
							}
						}).catch(function(e) {
							o.updateAsyncError(a, i, e, "\u9080\u8bf7\u597d\u53cb")
						});
						break;
					case faceBookSDKTest:
						ccLog("\u9080\u8bf7\u597d\u53cb\u3002"), null != t && t();
						var s = new n;
						s.initialize(e), s.drawCompleteFun = function(e) {
							ccLog(e)
						}
				}
			},
			shareGame: function(e, t, a, i) {
				switch (gameSDKName) {
					case faceBookSDK:
						var o = this;
						(s = new n).initialize(e), s.drawCompleteFun = function(n) {
							var s = new Image;
							s.crossOrigin = "anonymous", s.src = n, s.onload = function() {
								FBInstant.shareAsync({
									intent: "SHARE",
									image: n,
									text: e.text,
									data: e.data
								}).then(function() {
									null != t && t()
								}).catch(function(e) {
									o.updateAsyncError(a, i, e, "\u5206\u4eab\u597d\u53cb")
								})
							}
						};
						break;
					case faceBookSDKTest:
						var s;
						null != t && t(), (s = new n).initialize(e), s.drawCompleteFun = function(e) {
							ccLog(e)
						}
				}
			},
			appointFaceBookFriendOnlyUpdateAsync: function(e, t, a, i) {
				switch (gameSDKName) {
					case faceBookSDK:
						var o = this;
						if (null == FBInstant.context.getID()) return void(null != i && i());
						ccLog("appointFaceBookFriend\u65b9\u6cd5\u56de\u8c03"), (s = new n).initialize(e), s.drawCompleteFun = function(n) {
							ccLog("\u9080\u8bf7\u6307\u5b9a\u73a9\u5bb6\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u8c03\u7528FBInstant.updateAsync\u65b9\u6cd5"), FBInstant.updateAsync({
								action: "CUSTOM",
								cta: "Play",
								template: e.updateAsyncTemplate,
								image: n,
								text: e.updateAsyncText,
								data: e.data,
								strategy: "LAST",
								notification: "PUSH"
							}).then(function() {
								null != t && (ccLog("\u6307\u5b9a\u597d\u53cb\u56de\u8c03\uff01"), t())
							}).catch(function(e) {
								o.updateAsyncError(a, i, e, "\u9080\u8bf7\u6307\u5b9a\u597d\u53cb")
							})
						};
						break;
					case faceBookSDKTest:
						var s;
						null != t && t(), (s = new n).initialize(e), s.drawCompleteFun = function(e) {
							var t = new Image;
							t.crossOrigin = "anonymous", t.src = e, t.onload = function() {
								ccLog(e)
							}
						}
				}
			},
			appointFaceBookFriendAndUpdateAsync: function(e, t, a, i) {
				var o = this;
				switch (gameSDKName) {
					case faceBookSDK:
						ccLog("\u8c03\u7528appointFaceBookFriend\u65b9\u6cd5,\u9080\u8bf7\u6307\u5b9a\u73a9\u5bb6id\uff1a" + e.playerID), FBInstant.context.createAsync(e.playerID).then(function() {
							o.appointFaceBookFriendOnlyUpdateAsync(e, t, a, i)
						}).catch(function(e) {
							o.updateAsyncError(a, i, e, "\u9080\u8bf7\u6307\u5b9a\u597d\u53cb")
						});
						break;
					case faceBookSDKTest:
						null != t && t();
						var s = new n;
						s.initialize(e), s.drawCompleteFun = function(e) {
							var t = new Image;
							t.crossOrigin = "anonymous", t.src = e, t.onload = function() {
								ccLog(e)
							}
						}
				}
			},
			updateAsyncError: function(e, t, n, a) {
				ccLog(n), null != n ? (ccLog(a + "\u5931\u8d25"), "USER_INPUT" == n.code ? null != e && e() : null != t && t()) : (ccLog(a + "\u5931\u8d25"), null != t && t())
			}
		}), cc._RF.pop()
	}, {
		GameCustomImage: "GameCustomImage"
	}],
	FacebookSDKTestData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a0ffbm3xIlJmb9aficuwFud", "FacebookSDKTestData"), window.fbSaveDataKey = ["footballdata20191101"], window.gameSaveDataKey = "footballdata20191101", window.fbRankName = "footballLeaderBoard1", window.videoAdKeyList = ["493439584846411_495938334596536", "493439584846411_500069044183465", "493439584846411_500069140850122", "493439584846411_500069220850114", "493439584846411_500069334183436", "493439584846411_500069417516761"], window.interstitialAdKeyList = ["493439584846411_500069694183400", "493439584846411_500069737516729", "493439584846411_500069790850057", "493439584846411_500069860850050", "493439584846411_500069920850044"], window.noVedioDes = "We're sorry, but there are no available videos to show right now. Please try again!", window.fullVedioDes = "Chances are used up, please come tomorrow.", window.botData = new Object, window.createTestPlayer = function() {
			gameSDK.sdkPlayInfo.playerID = "10001", gameSDK.sdkPlayInfo.name = "test player", gameSDK.sdkPlayInfo.photo = "testhead"
		}, window.setFriendsList = function() {}, window.addLoadingCircle = function() {
			MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.loading_ad_prefab)
		}, window.removeLoadingCircle = function() {
			MyGameEvent.emit(MyGameEvent.removeAdLoading)
		}, window.createGameSureTitleWindow = function() {
			var e = GameViewConfig.tips;
			e.data = Util.getLanguage(1046), MyGameEvent.emit(MyGameEvent.openView, e)
		}, window.getPlayerEntryRankData = function() {
			var e = new Object;
			return e.rank = 3, e
		}, window.getPlayGamePlayerRankData = function() {
			return []
		}, window.getConnectedPlayerEntriesRankData = function() {
			var e = [];
			return e.push({
				playerID: "10001",
				photo: "testhead",
				name: "zhang1",
				score: 2e3,
				rank: 1,
				data: "19_320"
			}), e.push({
				playerID: "10002",
				photo: "testhead",
				name: "zhang2",
				score: 1990,
				rank: 2,
				data: "18_320"
			}), e.push({
				playerID: "10002",
				photo: "testhead",
				name: "zhang2",
				score: 1990,
				rank: 2,
				data: "17_320"
			}), e.push({
				playerID: "10003",
				photo: "testhead",
				name: "zhang3",
				score: 1980,
				rank: 3,
				data: "15_120"
			}), e.push({
				playerID: "10004",
				photo: "testhead",
				name: "zhang4",
				score: 1970,
				rank: 4,
				data: "15_110"
			}), e.push({
				playerID: "10005",
				photo: "testhead",
				name: "zhang5",
				score: 1960,
				rank: 5,
				data: "15_100"
			}), e.push({
				playerID: "10006",
				photo: "testhead",
				name: "zhang6",
				score: 1950,
				rank: 6,
				data: "15_90"
			}), e.push({
				playerID: "10007",
				photo: "testhead",
				name: "zhang7",
				score: 1940,
				rank: 7,
				data: "15_80"
			}), e
		}, window.getLocalEntriesRankData = function() {
			var e = [];
			return e.push({
				playerID: "10001",
				photo: "testhead",
				name: "zhang1",
				score: 2e3,
				rank: 1,
				data: "19_310"
			}), e.push({
				playerID: "10002",
				photo: "testhead",
				name: "zhang2",
				score: 1990,
				rank: 2,
				data: "18_320"
			}), e.push({
				playerID: "10002",
				photo: "testhead",
				name: "zhang2",
				score: 1990,
				rank: 2,
				data: "17_320"
			}), e.push({
				playerID: "10003",
				photo: "testhead",
				name: "zhang3",
				score: 1980,
				rank: 3,
				data: "16_120"
			}), e.push({
				playerID: "10004",
				photo: "testhead",
				name: "zhang4",
				score: 1970,
				rank: 4,
				data: "15_110"
			}), e.push({
				playerID: "10005",
				photo: "testhead",
				name: "zhang5",
				score: 1960,
				rank: 5,
				data: "15_100"
			}), e.push({
				playerID: "10006",
				photo: "testhead",
				name: "zhang6",
				score: 1950,
				rank: 6,
				data: "15_90"
			}), e.push({
				playerID: "10007",
				photo: "testhead",
				name: "zhang7",
				score: 1940,
				rank: 7,
				data: "15_80"
			}), e.push({
				playerID: "10008",
				photo: "testhead",
				name: "zhang8",
				score: 1930,
				rank: 8,
				data: "15_70"
			}), e
		}, window.getSupplementTestData = function() {}, window.getPayTestData = function() {
			return {
				purchaseToken: "123456",
				productID: "9001",
				signedRequest: "123"
			}
		}, window.getBotData = function() {
			return null == botData && (botData = new Object), botData
		}, window.getRandomBot = function() {
			var e, t = ["Max Julia", "Nathan Anthony", "Asa Webb", "Phil Harrison", "Diana Hoyle", "Gloria Nelly", "Rodney Warner", "Eunice Peggy", "Henry Katrine", "Oscar Anderson", "Glenn Cocker", "Kerr Reade", "Lindsay Gill,", "Vito Hobbes", "Andy Hugh", "Elroy MacAdam", "Ternence Emma", "Ruth Harrington", "Sam Carmen", "Yvette Spenser", "Joy Eve", "Erin Christ", "Omar Maxwell", "Devin Theresa", "Godfery Collins", "Edwiin Becky", "Christopher Pop", "Aldrich White", "June Margery", "Dominic Larkin", "Jason Carllyle", "Armand Flower", "Ian Hughes", "Rex Burke", "Crystal Peg", "Quintina Petty", "Myron Yule", "Kay Noel", "Linda Felix", "Abel Smith", "Irene Fast", "Ruth Nell", "Wade Kit", "Ivy Grant", "Tom Pope", "Sibyl Rhodes", "Noel Lawrence", "Charles Edward", "Kirk Finn", "Ophelia Peter", "Candice Wild", "Bblythe Eveline", "Mary Philemon", "Grace Beerbohm", "Brian Rayleign", "Oscar Mark", "Will Carroll", "Cora Garcia", "Truman Kennedy", "Maurice Fanny", "Booth Birrell", "Eve DuBois", "Edwina Theresa", "Marsh Roland", "Salome Malan", "Ryan Ellis", "Morgan Chris", "Byron Tracy", "Eric Bertie", "Hazel Evan", "Chad Ferguson", "Dolores Adolph", "Ira Bell", "Basil Moses", "Eartha Lawson", "Lucien Harper", "Ivan Bulwer", "Gloria Jim", "Anna Aldridge", "Wilbur Dunlop", "Yale Bob", "Roberta Dewar", "Jo Bruce", "Simon Wallace", "Abel Christy", "Otis Copper", "Elva Sheridan", "Edison Horatio", "Christian Coco", "Betty Pater", "Janet Beaufort", "Norma Matthew", "Payne Anto", "Bertram Dewey", "Vera Ingersoll", "Vincent Holmes", "Jamie Lucy", "Aaron Ramsden", "Buck Daisy", "Howar Louisa", "Yvonne Wallis", "Nathan Oliver", "Ada Clara", "Caesar Henry", "Cynthia Noyes", "Nathaniel Leo", "Griffith Marcus", "Tabitha Pulit", "Chad Hewlett", "Patricia Yerkes", "Jennifer Nahum", "Alston Sophia", "Brian Martin", "Leif Hamilton", "Mike Conrad", "Coral Gus", "Matthew Isaac", "Broderick Joe", "Harold Cover", "Orville McCar", "Lena Giles", "Giles Anna", "Sophia Joyce", "Clare Carpenter", "Tab Yeates", "Jacqueline Cra", "Alvin MacArthur", "Alvis Garcia", "Omar Salome", "Maud Ferguson", "Eudora Cotton", "Lennon Dickens", "Robin Toby", "Zora Buck", "Tony Camilla", "Hedy Wordsworth", "Lesley Morgan", "Devin Maud", "Isidore Palmer", "Benson Scripps", "Phil Webster", "Hyman Pearson", "Magee", "Hilary Martha", "Grace Noah", "Arm Ernest", "Wendell Abraham", "Adair Acheson", "Betsy Larkin", "Marshall Walton", "Rex Bertha", "Nicole Harrod", "Arm Elinor", "Audrey Swin", "Elvira Tommy", "Roxanne Eveline", "Newman Bess", "Dominic Wood", "Nat Anderson", "Nelly James", "Gabriel Grote", "Joseph Darwin", "Gloria Joan", "Hubery Conan", "Tyrone Marion", "Sabina Dickey", "Emma Ernest", "Avery Raglan", "Maxine Sharp", "Sarah Felix", "Alfred Isabel", "Wright Gall", "Evange Lucius", "Burnell Gal", "Zoe Kennedy", "Gwend Oliver", "Alexia Ted", "Blanche Chaplin", "Aries Bell", "Dolores Lincoln", "Ulysses Guy", "Barnett Nick", "Yale Julian", "Wade Peter", "Benjamin Donne", "Miranda Douglas", "Jim Marshall", "Richard Van", "Saxon Leopold", "Ralap Milton", "Dave Surrey", "Emily Barney", "Thomas Christ", "Cliff Thoreau", "Jenny Quiller", "Marina Aldridge", "Augus Abe", "Quinn Irving", "Alice Zacharias", "Winifred Troll", "There Euphemia", "Mandy Spring", "Ida Dewar", "Geoffrey Parker", "Zenobia Gunther", "Raymond Carroll", "Jill Wilde", "Jacqueline Hugh", "Edwiin Eisen", "Lucien Henri", "Ingrid Patience", "Victor Wilhel", "Marvin Jennings", "Teresa Maria", "Faithe Rob", "Cherry Morrison", "Sandy Wagner"],
				a = {};
			a.name = t[~~(Math.random() * t.length)];
			do {
				e = "bot" + ~~(17 * Math.random() + 1)
			} while (n == e);
			return a.photo = e, n = e, a
		};
		var n = "";
		cc._RF.pop()
	}, {}],
	FightSceneControl: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5322ciJRqlNBJs5leFzBc8h", "FightSceneControl"), window.fightSceneControl = null, cc.Class({
			extends: cc.Component,
			properties: {
				gameMapSceneControl: null,
				gamePlayControl: null,
				gamePlayData: null,
				openWindowComponent: null,
				gameEffectControl: null
			},
			onLoad: function() {
				var e = this;
				CFG.currentFightScene = 1, this.node.addComponent("viewManager").initEndCall(function() {
					MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.gamemap), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.game_map_door), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.game_small_map), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_times_up_prefab), MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gameBall, cc.find("Canvas/ball"))), e.addPlayerAndNpc()
				}), this.node.addComponent("prefabManager"), this.node.addComponent("gameScheduleManager"), fightSceneControl = this
			},
			onDestroy: function() {
				fightSceneControl = null, this.gameMapSceneControl = null, this.gamePlayControl = null, this.gamePlayData = null, this.openWindowComponent = null, this.gameEffectControl = null
			},
			addPlayerAndNpc: function() {
				MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gamePlayer, cc.find("Canvas/persons"), {
					enemy: 0,
					type: 0
				})), CFG.testPlayerCount = 0, this.buildPersonWith(0, 1), this.buildPersonWith(0, 2), this.buildPersonWith(0, 3), this.buildPersonWith(0, 4), debugTest.noEnemyModel || (this.buildPersonWith(1, 0), this.buildPersonWith(1, 1), this.buildPersonWith(1, 2), this.buildPersonWith(1, 3), this.buildPersonWith(1, 4), this.buildPersonWith(1, 5))
			},
			buildPersonWith: function(e, t) {
				CFG.testPlayerCount++, MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.npcPlayer, cc.find("Canvas/persons"), {
					enemy: e,
					type: t
				}))
			},
			enterMainScene: function() {
				cc.director.loadScene("MainScene", function() {})
			}
		}), cc._RF.pop()
	}, {}],
	GameAdapterInfo: [function(e, t) {
		"use strict";
		cc._RF.push(t, "375633YqwlC24g7GwnH8krd", "GameAdapterInfo"), cc.Class({
			properties: {
				isInit: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0)
			},
			getPercentageX: function(e) {
				return Math.floor(engineGlobal.viewGameWidth * e)
			},
			getPercentageY: function(e) {
				return Math.floor(engineGlobal.viewGameHeigh * e)
			},
			getTopY: function(e) {
				return engineGlobal.viewGameHeigh - e
			},
			getEndY: function(e) {
				return e
			},
			getLeftX: function(e) {
				return e
			},
			getRightX: function(e) {
				return engineGlobal.viewGameWidth - e
			},
			addSceneNode: function(e, t, n, a) {
				e.x = t, e.y = n, cc.director.getScene().addChild(e), null != a && (e.zIndex = a)
			}
		}), cc._RF.pop()
	}, {}],
	GameAnimation: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ef015EzgtlAoqLz65owp9gV", "GameAnimation"), cc.Class({
			extends: cc.Node,
			properties: {
				frameIndex: null,
				lastFrameTime: null,
				frameIntervalTime: null,
				isInit: null,
				playCount: null,
				curPlayCount: null,
				isStop: null,
				isRemoveFromComplete: null,
				frameFun: null,
				frameCompleteFun: null,
				playFrameIndex: null,
				fromFrameIndex: null,
				imgeData: null,
				animationSprite: null
			},
			destroy: function() {
				this.frameIndex = null, this.lastFrameTime = null, this.frameIntervalTime = null, this.isInit = null, this.playCount = null, this.curPlayCount = null, this.isStop = null, this.isRemoveFromComplete = null, this.frameFun = null, this.frameCompleteFun = null, this.playFrameIndex = null, this.fromFrameIndex = null, this.imgeData = null, this.animationSprite = null, this._super()
			},
			initialize: function() {
				if (1 != this.isInit) {
					this.lastFrameTime = 0, this.playCount = 1, this.isRemoveFromComplete = !0, this.frameIndex = 0, this.imgeData = [], this.animationSprite = this.addComponent(cc.Sprite);
					var e = this;
					this.animationSprite.update = function() {
						e.playFrame()
					}
				}
			},
			addImgeData: function(e, t) {
				var n = new Object;
				n.spriteAtlasURL = e, n.pngName = t, this.imgeData.push()
			},
			setImgeData: function(e) {
				this.imgeData = e
			},
			playFrame: function() {
				if (1 != this.isStop && engine.gameTime.getLocalTime() - this.lastFrameTime > this.frameIntervalTime) {
					if (this.frameIndex > this.playFrameIndex)
						if (this.curPlayCount++, -1 == this.playCount) this.frameIndex = this.fromFrameIndex;
						else {
							if (!(this.curPlayCount < this.playCount)) return this.gotoAndStop(this.playFrameIndex), null != this.frameCompleteFun && this.frameCompleteFun(), void(1 == this.isRemoveFromComplete && this.destroy());
							this.frameIndex = this.fromFrameIndex
						} this.lastFrameTime = engine.gameTime.getLocalTime(this.frameIndex), this.setBitmapInfo(this.frameIndex), null != this.frameFun && this.frameFun(this.frameIndex), this.frameIndex++
				}
			},
			play: function() {
				this.isStop = !1, this.frameIndex = 0, this.fromFrameIndex = 0, this.playFrameIndex = this.imgeData.length - 1
			},
			setBitmapInfo: function() {
				var e = this.imgeData[this.frameIndex];
				this.animationSprite.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(e.spriteAtlasURL, e.pngName)
			},
			setFrameIntervalTime: function(e) {
				this.frameIntervalTime = parseInt(1e3 / e)
			},
			gotoAndPlay: function(e) {
				this.isStop = !1, this.lastFrameTime = 0, this.frameIndex = e, this.setBitmapInfo(this.frameIndex)
			},
			fromFrameIndexToPlayFrameIndex: function(e, t) {
				this.isStop = !1, this.fromFrameIndex = e, this.frameIndex = e, this.lastFrameTime = 0, this.setBitmapInfo(this.frameIndex), this.playFrameIndex = t
			},
			gotoAndStop: function(e) {
				this.isStop = !0, this.lastFrameTime = 0, this.frameIndex = e, this.setBitmapInfo(this.frameIndex)
			},
			setIsStop: function(e) {
				this.isStop = e
			}
		}), cc._RF.pop()
	}, {}],
	GameArtWord: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d8046JMZohPYZDKseUdDG5K", "GameArtWord"), window.ArtWordStyleType = cc.Enum({
			middle: 0,
			left: 1,
			right: 2
		}), window.escapeTxt = new Object, escapeTxt["/"] = "gang", window.setEscapeTxt = function(e, t) {
			escapeTxt[e] = t
		}, cc.Class({
			extends: cc.Component,
			properties: {
				_text: "",
				_styleType: ArtWordStyleType.middle,
				_txtWidth: 0,
				_indentationWidth: 0,
				_txtHight: 0,
				_fontName: "",
				_txtNode: null,
				_fontSpriteAtlas: null,
				_stringSize: null,
				_isInit: null,
				styleType: {
					type: ArtWordStyleType,
					set: function(e) {
						this._styleType = e, this.refreshString()
					},
					get: function() {
						return this._styleType
					}
				},
				txtWidth: {
					set: function(e) {
						this._txtWidth = e, this.refreshString()
					},
					get: function() {
						return this._txtWidth
					}
				},
				indentationWidth: {
					set: function(e) {
						this._indentationWidth = e, this.refreshString()
					},
					get: function() {
						return this._indentationWidth
					}
				},
				txtHight: {
					set: function(e) {
						this._txtHight = e, this.refreshString()
					},
					get: function() {
						return this._txtHight
					}
				},
				fontName: {
					set: function(e) {
						this._fontName = e, this.refreshString()
					},
					get: function() {
						return this._fontName
					}
				},
				fontSpriteAtlas: {
					type: cc.SpriteAtlas,
					set: function(e) {
						this._fontSpriteAtlas = e, this.refreshString()
					},
					get: function() {
						return this._fontSpriteAtlas
					}
				},
				text: {
					set: function(e) {
						this.setString(e)
					},
					get: function() {
						return this._text
					}
				}
			},
			initialize: function() {
				1 != this._isInit && (this._isInit = !0, this.node.destroyAllChildren())
			},
			onDestroy: function() {},
			onLoad: function() {
				this.initialize(), this.refreshString()
			},
			refreshString: function() {
				var e = this._text;
				this._text = "", this.setString(e)
			},
			setString: function(e) {
				if (e != this._text) {
					null != this._txtNode && (this._txtNode.destroy(), this._txtNode = null), null == this._stringSize && (this._stringSize = new cc.Size), this._text = e, this._txtNode = new cc.Node, this.node.addChild(this._txtNode);
					for (var t = 0, n = 0; n < e.length; n++) {
						var a = e[n];
						null != escapeTxt[a] && (a = escapeTxt[a]);
						var i = new cc.Node;
						switch (i.addComponent(cc.Sprite).spriteFrame = this.fontSpriteAtlas.getSpriteFrame(this.fontName + "_" + a), this.styleType) {
							case ArtWordStyleType.middle:
							case ArtWordStyleType.left:
								i.setAnchorPoint(0, .5);
								break;
							case ArtWordStyleType.right:
								i.setAnchorPoint(1, .5)
						}
						i.x = t;
						var o = i.getContentSize();
						i.x = t, null != o && null != o.width && 0 != o.width ? t = t + o.width + this._indentationWidth : t += this.txtWidth, this._txtNode.addChild(i)
					}
					switch (this._stringSize.width = t, this.styleType) {
						case ArtWordStyleType.middle:
							this._txtNode.x = -t / 2
					}
				}
			}
		}), cc._RF.pop()
	}, {}],
	GameBackgroundLoad: [function(e, t) {
		"use strict";
		cc._RF.push(t, "8bc49QqK9RG2bYp1kfM6FF+", "GameBackgroundLoad");
		var n = e("LoadControl");
		cc.Class({
			properties: {
				loadInfoArr: null,
				isLoad: null,
				isInit: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.loadInfoArr = [], this.isLoad = !1)
			},
			addLoadRes: function(e) {
				for (var t = 0; t < e.length; t++) this.loadInfoArr.push(e[t]);
				this.loadRes()
			},
			loadRes: function() {
				if (0 == this.isLoad && this.loadInfoArr.length > 0) {
					var e = this;
					this.isLoad = !0;
					var t = new n,
						a = new Object;
					a.resources = [this.loadInfoArr.shift()], a.completeCallback = function() {
						e.isLoad = !1, e.loadRes()
					}, t.initialize(a), t.load()
				}
			}
		}), cc._RF.pop()
	}, {
		LoadControl: "LoadControl"
	}],
	GameConfigData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "bcdcaOtveBL+ZCFx2h2T3MR", "GameConfigData");
		var n = e("GameRankData"),
			a = e("GameExternalImage");
		cc.Class({
			properties: {
				mapSizeInfo: null,
				myTeamPlayerInfo: null,
				otherTeamPlayerInfo: null,
				gemMyTeamPlayerInfo: null,
				gemOtherTeamPlayerInfo: null,
				mapLimitInfo: null,
				skinShopInfo: null,
				playerSkinInfo: null,
				ballSkinInfo: null,
				lvExpInfo: null,
				countDown: null,
				reLivecountDown: null,
				expAdd: null,
				mapRingPos: null,
				gemMapRingPos: null,
				mapNumberInfo: null,
				mapTouchdownPos: null,
				teamPlayerDifficultyInfo: null,
				gameRankData: null,
				robotNameArr: null,
				defensePointList: null,
				targetPerson: null,
				watchAD_gem_num: null,
				watchAD_rankup_gem_num: null,
				gemOtherSpeed: null,
				gemOtherSkin: null,
				gemMyAddSpeed: null,
				gemMyInvincibleSpeed: null,
				taskData: null,
				skillData: null,
				difficultData: null
			},
			initialize: function() {
				this.initSkinShopInfo(), this.initPlayerSkinInfo(), this.initBallSkinInfo(), this.initLvExpInfo(), this.initRobotNameArr(), this.initTaskInfo(), this.initSkillInfo(), this.initDifficultInfo(), this.countDown = 1145e3, this.reLivecountDown = 3e4, this.expAdd = {
					win: 9,
					fail: 3
				}, this.watchAD_gem_num = 120, this.watchAD_rankup_gem_num = 150, this.gemOtherSpeed = 11, this.gemOtherSkin = 3e3, this.gemMyAddSpeed = 16, this.gemMyInvincibleSpeed = 18, this.timeCountDown = 3e4, this.gameRankData = new n, this.gameRankData.initialize()
			},
			initSkinShopInfo: function() {
				this.skinShopInfo = [
					[1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012],
					[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012]
				]
			},
			initPlayerSkinInfo: function() {
				var e = "id,\u76ae\u80a4ID,\u4ef7\u683c,\u5e7f\u544a\u6b21\u6570,\u663e\u793a\u63cf\u8ff0,\u771f\u5b9e\u6548\u679c\u5bf9\u5e94\u503c,\u52a0\u51cf,\u5177\u4f53\u503c,\u4e2d\u6587\u7ffb\u8bd1,lan_id,lan_value\n1001,1,0,0,Slide tackle distance +30,6,+,30,\u94f2\u7403\u8ddd\u79bb+30,1037,30\n1002,2,0,10,Dribbling +10,5,+,1,\u5e26\u7403\u901f\u5ea6+10,1031,10\n1003,3,1200,0,Sprint speed +8,4,+,0.8,\u65e0\u7403\u901f\u5ea6+8,1034,8\n1004,4,1200,0,Dribbling +8,5,+,0.8,\u5e26\u7403\u901f\u5ea6+8,1031,8\n1005,5,0,10,Body strength +100,9,-,1000,\u8eab\u4f53\u786c\u76f4+100,1043,100\n1006,6,0,10,Shot power +50,8,+,175,\u5c04\u95e8\u529b\u5ea6+50,1028,50\n1007,7,1500,0,Slide tackle distance +60,6,+,60,\u94f2\u7403\u8ddd\u79bb+60,1037,60\n1008,8,1500,0,Body strength +100,9,-,1000,\u8eab\u4f53\u786c\u76f4+100,1043,100\n1009,9,1500,0,Sprint speed +10,4,+,1,\u65e0\u7403\u901f\u5ea6+10,1034,10\n1010,10,2500,0,Dribbling +18,5,+,1.8,\u5e26\u7403\u901f\u5ea6+18,1031,18\n1011,11,0,10,Acceleration +8,11,+,0.4,\u52a0\u901f\u5ea6+8,1040,8\n1012,12,2500,0,Sprint speed +18,4,+,1.8,\u65e0\u7403\u901f\u5ea6+18,1034,18".split("\n");
				e.shift(), this.playerSkinInfo = {};
				for (var t = 0; t < e.length; t++) {
					var n = e[t].split(",");
					this.playerSkinInfo[~~n[0]] = {
						skinID: n[1],
						price: n[2],
						ad: n[3],
						attrIndex: n[5],
						valueDir: "+" == n[6],
						value: n[7],
						lang_id: n[9],
						lang_value: n[10]
					}
				}
			},
			initBallSkinInfo: function() {
				this.ballSkinInfo = {}, this.ballSkinInfo[2001] = {
					skinID: 2001,
					price: 0,
					ad: 0
				}, this.ballSkinInfo[2002] = {
					skinID: 2002,
					price: 0,
					ad: 10
				}, this.ballSkinInfo[2003] = {
					skinID: 2003,
					price: 1200,
					ad: 0
				}, this.ballSkinInfo[2004] = {
					skinID: 2004,
					price: 1200,
					ad: 0
				}, this.ballSkinInfo[2005] = {
					skinID: 2005,
					price: 0,
					ad: 10
				}, this.ballSkinInfo[2006] = {
					skinID: 2006,
					price: 0,
					ad: 10
				}, this.ballSkinInfo[2007] = {
					skinID: 2007,
					price: 1500,
					ad: 0
				}, this.ballSkinInfo[2008] = {
					skinID: 2008,
					price: 1500,
					ad: 0
				}, this.ballSkinInfo[2009] = {
					skinID: 2009,
					price: 1500,
					ad: 0
				}, this.ballSkinInfo[2010] = {
					skinID: 2010,
					price: 2500,
					ad: 0
				}, this.ballSkinInfo[2011] = {
					skinID: 2011,
					price: 0,
					ad: 10
				}, this.ballSkinInfo[2012] = {
					skinID: 2012,
					price: 2500,
					ad: 0
				}
			},
			initLvExpInfo: function() {
				this.lvExpInfo = new Object, this.lvExpInfo[1] = {
					exp: 30,
					name: "grade0",
					totalexp: 0,
					lvstr: "Bronze 3",
					offerY: 0,
					languageId: 1e3,
					languageValue: 3
				}, this.lvExpInfo[2] = {
					exp: 50,
					name: "grade1",
					totalexp: 30,
					lvstr: "Bronze 2",
					offerY: 0,
					languageId: 1e3,
					languageValue: 2
				}, this.lvExpInfo[3] = {
					exp: 70,
					name: "grade2",
					totalexp: 80,
					lvstr: "Bronze 1",
					offerY: 0,
					languageId: 1e3,
					languageValue: 1
				}, this.lvExpInfo[4] = {
					exp: 90,
					name: "grade3",
					totalexp: 150,
					lvstr: "Silver 3",
					offerY: 0,
					languageId: 1001,
					languageValue: 3
				}, this.lvExpInfo[5] = {
					exp: 110,
					name: "grade4",
					totalexp: 240,
					lvstr: "Silver 2",
					offerY: 0,
					languageId: 1001,
					languageValue: 2
				}, this.lvExpInfo[6] = {
					exp: 130,
					name: "grade5",
					totalexp: 350,
					lvstr: "Silver 1",
					offerY: 0,
					languageId: 1001,
					languageValue: 1
				}, this.lvExpInfo[7] = {
					exp: 150,
					name: "grade6",
					totalexp: 480,
					lvstr: "Gold 3",
					offerY: 10,
					languageId: 1002,
					languageValue: 3
				}, this.lvExpInfo[8] = {
					exp: 170,
					name: "grade7",
					totalexp: 630,
					lvstr: "Gold 2",
					offerY: 10,
					languageId: 1002,
					languageValue: 2
				}, this.lvExpInfo[9] = {
					exp: 190,
					name: "grade8",
					totalexp: 800,
					lvstr: "Gold 1",
					offerY: 10,
					languageId: 1002,
					languageValue: 1
				}, this.lvExpInfo[10] = {
					exp: 210,
					name: "grade9",
					totalexp: 990,
					lvstr: "Platinum 3",
					offerY: 12,
					languageId: 1003,
					languageValue: 3
				}, this.lvExpInfo[11] = {
					exp: 230,
					name: "grade10",
					totalexp: 1200,
					lvstr: "Platinum 2",
					offerY: 12,
					languageId: 1003,
					languageValue: 2
				}, this.lvExpInfo[12] = {
					exp: 250,
					name: "grade11",
					totalexp: 1430,
					lvstr: "Platinum 1",
					offerY: 12,
					languageId: 1003,
					languageValue: 1
				}, this.lvExpInfo[13] = {
					exp: 270,
					name: "grade12",
					totalexp: 1680,
					lvstr: "Diamond 3",
					offerY: 0,
					languageId: 1004,
					languageValue: 3
				}, this.lvExpInfo[14] = {
					exp: 290,
					name: "grade13",
					totalexp: 1850,
					lvstr: "Diamond 2",
					offerY: 0,
					languageId: 1004,
					languageValue: 2
				}, this.lvExpInfo[15] = {
					exp: 310,
					name: "grade14",
					totalexp: 2140,
					lvstr: "Diamond 1",
					offerY: 0,
					languageId: 1004,
					languageValue: 1
				}, this.lvExpInfo[16] = {
					exp: 330,
					name: "grade15",
					totalexp: 2450,
					lvstr: "King",
					offerY: 0,
					languageId: 1005,
					languageValue: 1
				}, this.lvExpInfo.max = 16
			},
			getLvExpInfo: function(e) {
				return e > this.lvExpInfo.max && (e = this.lvExpInfo.max), this.lvExpInfo[e]
			},
			randomWinSpine: function() {
				var e = [window.WinPlayerSkinTypeEm.victory, window.WinPlayerSkinTypeEm.victory2, window.WinPlayerSkinTypeEm.victory3];
				return e.sort(function() {
					return Math.random() - .5
				}), e
			},
			getOthePlayerSkins: function() {
				var e, t = [];
				switch (e = null != heroData.trySkin ? heroData.trySkin : heroData.playerSkinInfo.select) {
					case 1002:
					case 1007:
					case 1009:
					case 1011:
						t = [1001, 1003, 1004, 1005, 1006, 1008, 1010];
						break;
					case 1001:
					case 1005:
					case 1006:
					case 1008:
						t = [1002, 1003, 1004, 1007, 1009, 1010, 1011];
						break;
					default:
						for (var n in this.playerSkinInfo) n != e && t.push(n)
				}
				if (heroData.playGameNum > 0 && (2 == heroData.playGameNum || heroData.playGameNum % 3 == 0)) {
					for (var a = [], i = 0; i < t.length; i++) 1009 != t[i] && 1010 != t[i] && 1011 != t[i] || a.push(t[i]);
					if (a.length > 0) {
						var o = Math.floor(Math.random() * a.length);
						(t = []).push(a[o])
					}
				}
				return t
			},
			getRandomPlayerSkin: function() {
				var e = [1002, 1003, 1004, 1005, 1006, 1007, 1008];
				return e[Math.floor(Math.random() * e.length)]
			},
			createHeadNode: function(e, t) {
				var n;
				if (-1 != e.indexOf("bot")) return (n = new cc.Node).addComponent(cc.Sprite), Util.setPic(n, "uipng/bot_head/" + e), n.scale = t / 98, n;
				if ("testhead" == e) return (n = new cc.Node).addComponent(cc.Sprite), Util.setPic(n, "testhead"), n.scale = t / 98, n;
				var i = new a;
				return i.loadImage(e, null, t, t), i
			},
			objDeepCopy: function(e) {
				var t = e instanceof Array ? [] : {};
				for (var n in e) t[n] = "object" == typeof e[n] ? this.objDeepCopy(e[n]) : e[n];
				return t
			},
			initRobotNameArr: function() {
				this.robotNameArr = ["Max Julia", "Nathan Anthony", "Asa Webb", "Phil Harrison", "Diana Hoyle", "Gloria Nelly", "Rodney Warner", "Eunice Peggy", "Henry Katrine", "Oscar Anderson", "Glenn Cocker", "Kerr Reade", "Lindsay Gill,", "Vito Hobbes", "Andy Hugh", "Elroy MacAdam", "Ternence Emma", "Ruth Harrington", "Sam Carmen", "Yvette Spenser", "Joy Eve", "Erin Christ", "Omar Maxwell", "Devin Theresa", "Godfery Collins", "Edwiin Becky", "Christopher Pop", "Aldrich White", "June Margery", "Dominic Larkin", "Jason Carllyle", "Armand Flower", "Ian Hughes", "Rex Burke", "Crystal Peg", "Quintina Petty", "Myron Yule", "Kay Noel", "Linda Felix", "Abel Smith", "Irene Fast", "Ruth Nell", "Wade Kit", "Ivy Grant", "Tom Pope", "Sibyl Rhodes", "Noel Lawrence", "Charles Edward", "Kirk Finn", "Ophelia Peter", "Candice Wild", "Bblythe Eveline", "Mary Philemon", "Grace Beerbohm", "Brian Rayleign", "Oscar Mark", "Will Carroll", "Cora Garcia", "Truman Kennedy", "Maurice Fanny", "Booth Birrell", "Eve DuBois", "Edwina Theresa", "Marsh Roland", "Salome Malan", "Ryan Ellis", "Morgan Chris", "Byron Tracy", "Eric Bertie", "Hazel Evan", "Chad Ferguson", "Dolores Adolph", "Ira Bell", "Basil Moses", "Eartha Lawson", "Lucien Harper", "Ivan Bulwer", "Gloria Jim", "Anna Aldridge", "Wilbur Dunlop", "Yale Bob", "Roberta Dewar", "Jo Bruce", "Simon Wallace", "Abel Christy", "Otis Copper", "Elva Sheridan", "Edison Horatio", "Christian Coco", "Betty Pater", "Janet Beaufort", "Norma Matthew", "Payne Anto", "Bertram Dewey", "Vera Ingersoll", "Vincent Holmes", "Jamie Lucy", "Aaron Ramsden", "Buck Daisy", "Howar Louisa", "Yvonne Wallis", "Nathan Oliver", "Ada Clara", "Caesar Henry", "Cynthia Noyes", "Nathaniel Leo", "Griffith Marcus", "Tabitha Pulit", "Chad Hewlett", "Patricia Yerkes", "Jennifer Nahum", "Alston Sophia", "Brian Martin", "Leif Hamilton", "Mike Conrad", "Coral Gus", "Matthew Isaac", "Broderick Joe", "Harold Cover", "Orville McCar", "Lena Giles", "Giles Anna", "Sophia Joyce", "Clare Carpenter", "Tab Yeates", "Jacqueline Cra", "Alvin MacArthur", "Alvis Garcia", "Omar Salome", "Maud Ferguson", "Eudora Cotton", "Lennon Dickens", "Robin Toby", "Zora Buck", "Tony Camilla", "Hedy Wordsworth", "Lesley Morgan", "Devin Maud", "Isidore Palmer", "Benson Scripps", "Phil Webster", "Hyman Pearson", "Magee", "Hilary Martha", "Grace Noah", "Arm Ernest", "Wendell Abraham", "Adair Acheson", "Betsy Larkin", "Marshall Walton", "Rex Bertha", "Nicole Harrod", "Arm Elinor", "Audrey Swin", "Elvira Tommy", "Roxanne Eveline", "Newman Bess", "Dominic Wood", "Nat Anderson", "Nelly James", "Gabriel Grote", "Joseph Darwin", "Gloria Joan", "Hubery Conan", "Tyrone Marion", "Sabina Dickey", "Emma Ernest", "Avery Raglan", "Maxine Sharp", "Sarah Felix", "Alfred Isabel", "Wright Gall", "Evange Lucius", "Burnell Gal", "Zoe Kennedy", "Gwend Oliver", "Alexia Ted", "Blanche Chaplin", "Aries Bell", "Dolores Lincoln", "Ulysses Guy", "Barnett Nick", "Yale Julian", "Wade Peter", "Benjamin Donne", "Miranda Douglas", "Jim Marshall", "Richard Van", "Saxon Leopold", "Ralap Milton", "Dave Surrey", "Emily Barney", "Thomas Christ", "Cliff Thoreau", "Jenny Quiller", "Marina Aldridge", "Augus Abe", "Quinn Irving", "Alice Zacharias", "Winifred Troll", "There Euphemia", "Mandy Spring", "Ida Dewar", "Geoffrey Parker", "Zenobia Gunther", "Raymond Carroll", "Jill Wilde", "Jacqueline Hugh", "Edwiin Eisen", "Lucien Henri", "Ingrid Patience", "Victor Wilhel", "Marvin Jennings", "Teresa Maria", "Faithe Rob", "Cherry Morrison", "Sandy Wagner"]
			},
			getRandomBot: function() {
				return {
					head: ~~(17 * Math.random() + 1),
					name: this.robotNameArr[~~(Math.random() * this.robotNameArr.length)]
				}
			},
			initTaskInfo: function() {
				this.taskData = {
					1: {
						des: "Complete 6 games",
						count: 6,
						award: 70,
						lang_id: 1021,
						lang_value: 6
					},
					2: {
						des: "Score 3 goals",
						count: 3,
						award: 60,
						lang_id: 1022,
						lang_value: 3
					},
					3: {
						des: "Win 5 games",
						count: 5,
						award: 100,
						lang_id: 1020,
						lang_value: 5
					},
					4: {
						des: "Achieve 4 winning streaks",
						count: 4,
						award: 150,
						lang_id: 1023,
						lang_value: 4
					},
					5: {
						des: "Collect 200 gold coins",
						count: 200,
						award: 100,
						lang_id: 1019,
						lang_value: 200
					},
					6: {
						des: "Win 2 qualifying matches",
						count: 2,
						award: 100,
						lang_id: 1024,
						lang_value: 2
					},
					7: {
						des: "Complete 3 Championships",
						count: 3,
						award: 80,
						lang_id: 1048,
						lang_value: 3
					},
					11: {
						des: "Complete 12 games",
						count: 12,
						award: 140,
						lang_id: 1021,
						lang_value: 12
					},
					12: {
						des: "Score 6 goals",
						count: 6,
						award: 120,
						lang_id: 1022,
						lang_value: 6
					},
					13: {
						des: "Win 10 games",
						count: 10,
						award: 200,
						lang_id: 1020,
						lang_value: 10
					},
					14: {
						des: "Winning streak in 8 matches",
						count: 8,
						award: 300,
						lang_id: 1023,
						lang_value: 8
					},
					15: {
						des: "Collect 400 gold coins",
						count: 400,
						award: 200,
						lang_id: 1019,
						lang_value: 400
					},
					16: {
						des: "Win 3 qualifying matches",
						count: 2,
						award: 200,
						lang_id: 1024,
						lang_value: 3
					},
					17: {
						des: "Complete 6 Championships",
						count: 6,
						award: 160,
						lang_id: 1048,
						lang_value: 6
					}
				}
			},
			initSkillInfo: function() {
				var e = "id,\u663e\u793a\u63cf\u8ff0,\u771f\u5b9e\u6548\u679c\u5bf9\u5e94\u503c,\u52a0\u51cf,\u5177\u4f53\u503c,\u7b49\u7ea7,\u4ef7\u683c,\u4e2d\u6587\u7ffb\u8bd1,lan_id,lan_value\n100,Increase shot power,8,+,0,0,200,\u589e\u52a0\u5c04\u95e8\u529b\u5ea6,1027,\n101,Shot power +10,8,+,35,1,350,\u5c04\u95e8\u529b\u5ea6+10,1028,10\n102,Shot power +20,8,+,70,2,500,\u5c04\u95e8\u529b\u5ea6+20,1028,20\n103,Shot power +30,8,+,105,3,650,\u5c04\u95e8\u529b\u5ea6+30,1028,30\n104,Shot power +40,8,+,140,4,800,\u5c04\u95e8\u529b\u5ea6+40,1028,40\n105,Shot power +50,8,+,175,5,950,\u5c04\u95e8\u529b\u5ea6+50,1028,50\n106,Shot power +60,8,+,210,6,1100,\u5c04\u95e8\u529b\u5ea6+60,1028,60\n107,Shot power +70,8,+,245,7,1250,\u5c04\u95e8\u529b\u5ea6+70,1028,70\n108,Shot power +80,8,+,280,8,1400,\u5c04\u95e8\u529b\u5ea6+80,1028,80\n109,Shot power +90,8,+,315,9,1550,\u5c04\u95e8\u529b\u5ea6+90,1028,90\n110,Shot power +100,8,+,350,10,0,\u5c04\u95e8\u529b\u5ea6+100,1028,100\n200,Increase dribbling,5,+,0,0,200,\u589e\u52a0\u5e26\u7403\u901f\u5ea6,1030,\n201,Dribbling +2,5,+,0.1,1,350,\u5e26\u7403\u901f\u5ea6+2,1031,2\n202,Dribbling +4,5,+,0.2,2,500,\u5e26\u7403\u901f\u5ea6+4,1031,4\n203,Dribbling +6,5,+,0.3,3,650,\u5e26\u7403\u901f\u5ea6+6,1031,6\n204,Dribbling +8,5,+,0.4,4,800,\u5e26\u7403\u901f\u5ea6+8,1031,8\n205,Dribbling +10,5,+,0.5,5,950,\u5e26\u7403\u901f\u5ea6+10,1031,10\n206,Dribbling +12,5,+,0.6,6,1100,\u5e26\u7403\u901f\u5ea6+12,1031,12\n207,Dribbling +14,5,+,0.7,7,1250,\u5e26\u7403\u901f\u5ea6+14,1031,14\n208,Dribbling +16,5,+,0.8,8,1400,\u5e26\u7403\u901f\u5ea6+16,1031,16\n209,Dribbling +18,5,+,0.9,9,1550,\u5e26\u7403\u901f\u5ea6+18,1031,18\n210,Dribbling +20,5,+,1,10,0,\u5e26\u7403\u901f\u5ea6+20,1031,20\n300,Increasing sprint speed,4,+,0,0,200,\u589e\u52a0\u65e0\u7403\u901f\u5ea6,1033,\n301,Sprint speed +2,4,+,0.1,1,350,\u65e0\u7403\u901f\u5ea6+2,1034,2\n302,Sprint speed +4,4,+,0.2,2,500,\u65e0\u7403\u901f\u5ea6+4,1034,4\n303,Sprint speed +6,4,+,0.3,3,650,\u65e0\u7403\u901f\u5ea6+6,1034,6\n304,Sprint speed +8,4,+,0.4,4,800,\u65e0\u7403\u901f\u5ea6+8,1034,8\n305,Sprint speed +10,4,+,0.5,5,950,\u65e0\u7403\u901f\u5ea6+10,1034,10\n306,Sprint speed +12,4,+,0.6,6,1100,\u65e0\u7403\u901f\u5ea6+12,1034,12\n307,Sprint speed +14,4,+,0.7,7,1250,\u65e0\u7403\u901f\u5ea6+14,1034,14\n308,Sprint speed +16,4,+,0.8,8,1400,\u65e0\u7403\u901f\u5ea6+16,1034,16\n309,Sprint speed +18,4,+,0.9,9,1550,\u65e0\u7403\u901f\u5ea6+18,1034,18\n310,Sprint speed +20,4,+,1,10,0,\u65e0\u7403\u901f\u5ea6+20,1034,20\n400,Increase slide tackle distance,6,+,0,0,200,\u589e\u52a0\u94f2\u7403\u8ddd\u79bb,1036,\n401,Slide tackle distance +10,6,+,10,1,350,\u94f2\u7403\u8ddd\u79bb+10,1037,10\n402,Slide tackle distance +20,6,+,20,2,500,\u94f2\u7403\u8ddd\u79bb+20,1037,20\n403,Slide tackle distance +30,6,+,30,3,650,\u94f2\u7403\u8ddd\u79bb+30,1037,30\n404,Slide tackle distance +40,6,+,40,4,800,\u94f2\u7403\u8ddd\u79bb+40,1037,40\n405,Slide tackle distance +50,6,+,50,5,950,\u94f2\u7403\u8ddd\u79bb+50,1037,50\n406,Slide tackle distance +60,6,+,60,6,1100,\u94f2\u7403\u8ddd\u79bb+60,1037,60\n407,Slide tackle distance +70,6,+,70,7,1250,\u94f2\u7403\u8ddd\u79bb+70,1037,70\n408,Slide tackle distance +80,6,+,80,8,1400,\u94f2\u7403\u8ddd\u79bb+80,1037,80\n409,Slide tackle distance +90,6,+,90,9,1550,\u94f2\u7403\u8ddd\u79bb+90,1037,90\n410,Slide tackle distance +100,6,+,100,10,0,\u94f2\u7403\u8ddd\u79bb+100,1037,100\n500,Increase acceleration,11,+,0,0,200,\u589e\u52a0\u52a0\u901f\u5ea6,1039,\n501,Acceleration +2,11,+,0.1,1,350,\u52a0\u901f\u5ea6+2,1040,2\n502,Acceleration +4,11,+,0.2,2,500,\u52a0\u901f\u5ea6+4,1040,4\n503,Acceleration +6,11,+,0.3,3,650,\u52a0\u901f\u5ea6+6,1040,6\n504,Acceleration +8,11,+,0.4,4,800,\u52a0\u901f\u5ea6+8,1040,8\n505,Acceleration +10,11,+,0.5,5,950,\u52a0\u901f\u5ea6+10,1040,10\n506,Acceleration +12,11,+,0.6,6,1100,\u52a0\u901f\u5ea6+12,1040,12\n507,Acceleration +14,11,+,0.7,7,1250,\u52a0\u901f\u5ea6+14,1040,14\n508,Acceleration +16,11,+,0.8,8,1400,\u52a0\u901f\u5ea6+16,1040,16\n509,Acceleration +18,11,+,0.9,9,1550,\u52a0\u901f\u5ea6+18,1040,18\n510,Acceleration +20,11,+,1,10,0,\u52a0\u901f\u5ea6+20,1040,20\n600,Increase body strength,9,-,0,0,200,\u589e\u52a0\u8eab\u4f53\u786c\u76f4,1042,\n601,Body strength +20,9,-,200,1,350,\u8eab\u4f53\u786c\u76f4+20,1043,20\n602,Body strength +40,9,-,400,2,500,\u8eab\u4f53\u786c\u76f4+40,1043,40\n603,Body strength +60,9,-,600,3,650,\u8eab\u4f53\u786c\u76f4+60,1043,60\n604,Body strength +80,9,-,800,4,800,\u8eab\u4f53\u786c\u76f4+80,1043,80\n605,Body strength +100,9,-,1000,5,950,\u8eab\u4f53\u786c\u76f4+100,1043,100\n606,Body strength +120,9,-,1200,6,1100,\u8eab\u4f53\u786c\u76f4+120,1043,120\n607,Body strength +140,9,-,1400,7,1250,\u8eab\u4f53\u786c\u76f4+140,1043,140\n608,Body strength +160,9,-,1600,8,1400,\u8eab\u4f53\u786c\u76f4+160,1043,160\n609,Body strength +180,9,-,1800,9,1550,\u8eab\u4f53\u786c\u76f4+180,1043,180\n610,Body strength +200,9,-,2000,10,0,\u8eab\u4f53\u786c\u76f4+200,1043,200\n".split("\n");
				e.shift(), this.skillData = {};
				for (var t = 0; t < e.length; t++) {
					var n = e[t].split(",");
					this.skillData[~~n[0]] = {
						attrIndex: n[2],
						valueDir: "+" == n[3],
						value: n[4],
						price: n[6],
						lang_id: n[8],
						lang_value: n[9]
					}
				}
			},
			initDifficultInfo: function() {
				var e = "id,\u6bb5\u4f4d,\u573a\u6b21,\u96be\u5ea6\n1,\u9752\u94dc3,1,1\n2,\u9752\u94dc3,2,1\n3,\u9752\u94dc3,3,2\n4,\u9752\u94dc2,1,1|1|2\n5,\u9752\u94dc2,2,1|2|2\n6,\u9752\u94dc2,3,2|2|3|3\n7,\u9752\u94dc1,1,1|1|2|2|2\n8,\u9752\u94dc1,2,2|2|2|3|3\n9,\u9752\u94dc1,3,3\n10,\u767d\u94f63,1,4|4|5|5|5\n11,\u767d\u94f63,2,4|4|5|5|5\n12,\u767d\u94f63,3,5|5|5|6|6\n13,\u767d\u94f62,1,4|4|4|5|5\n14,\u767d\u94f62,2,5|5|5|6|6\n15,\u767d\u94f62,3,5|5|5|6|6\n16,\u767d\u94f61,1,4|4|5|5|5\n17,\u767d\u94f61,2,5|5|5|6|6\n18,\u767d\u94f61,3,6\n19,\u9ec4\u91d13,1,7|7|8|8|8\n20,\u9ec4\u91d13,2,8|8|8|9|9\n21,\u9ec4\u91d13,3,8|8|8|9|9\n22,\u9ec4\u91d12,1,7|7|8|8|8\n23,\u9ec4\u91d12,2,8|8|8|9|9\n24,\u9ec4\u91d12,3,8|9|9|9|9\n25,\u9ec4\u91d11,1,7|7|7|8|8\n26,\u9ec4\u91d11,2,8|8|8|9|9\n27,\u9ec4\u91d11,3,8|9|9|9|9\n28,\u94c2\u91d13,1,10|10|10|9|9\n29,\u94c2\u91d13,2,10||10|9|9|9\n30,\u94c2\u91d13,3,9|9|11|11|11|11\n31,\u94c2\u91d12,1,10|10|10|9|9\n32,\u94c2\u91d12,2,10|10|10|11|11\n33,\u94c2\u91d12,3,10|10|11|11|11\n34,\u94c2\u91d11,1,10|10|10|9|9\n35,\u94c2\u91d11,2,10|11\n36,\u94c2\u91d11,3,10|11|11|11|11\n37,\u94bb\u77f33,1,11|11|12|12|12\n38,\u94bb\u77f33,2,11|11|12|12|12\n39,\u94bb\u77f33,3,12|12|12|13|13\n40,\u94bb\u77f32,1,11|11|12|12|12\n41,\u94bb\u77f32,2,11|11|12|12|12\n42,\u94bb\u77f32,3,12|12|12|13|13\n43,\u94bb\u77f31,1,11|11|12|12|12\n44,\u94bb\u77f31,2,11|11|12|12|12\n45,\u94bb\u77f31,3,12|12|12|13|13\n46,\u738b\u8005,1,12|12|13|13|13\n47,\u738b\u8005,2,13|13|14|14|14\n48,\u738b\u8005,3,13|13|13|14|14".split("\n");
				e.shift(), this.difficultData = {};
				for (var t = 0; t < e.length; t++) {
					var n = e[t].split(",");
					this.difficultData[~~n[0]] = {
						winTimes: n[2],
						difArr: n[3].split("|")
					}
				}
			},
			shuffleArray: function(e) {
				for (var t, n, a = e.length; a;) n = Math.floor(Math.random() * a--), t = e[a], e[a] = e[n], e[n] = t;
				return e
			}
		}), cc._RF.pop()
	}, {
		GameExternalImage: "GameExternalImage",
		GameRankData: "GameRankData"
	}],
	GameCustomImage: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a30caGbTeZA0qIJSZhWx2oD", "GameCustomImage"), cc.Class({
			properties: {
				width: null,
				height: null,
				pngData: null,
				fontData: null,
				drawFun: null,
				drawCompleteFun: null
			},
			initialize: function(e) {
				null != e.pngData ? this.pngData = e.pngData : this.pngData = [], null != e.fontData ? this.fontData = e.fontData : this.fontData = [], this.width = e.width, this.height = e.height, this.getBase64Image(e)
			},
			getBase64Image: function() {
				for (var e = this, t = 0; t < this.pngData.length; t++) {
					var n = this.pngData[t],
						a = new Image;
					n.playImage = a, a.crossOrigin = "anonymous", a.imgHeight = n.imgHeight, a.imgWidth = n.imgWidth, a.src = n.url, a.isLoad = !1, a.onload = function() {
						this.width = this.imgWidth, this.height = this.imgHeight, this.isLoad = !0, e.drawImage()
					}
				}
			},
			drawImage: function() {
				for (var e = 0; e < this.pngData.length; e++)
					if (1 != (a = this.pngData[e]).playImage.isLoad) return;
				if (null == this.drawFun) {
					var t = document.createElement("canvas");
					t.width = this.width, t.height = this.height;
					for (var n = 0; n < this.pngData.length; n++) {
						var a = this.pngData[n],
							i = t.getContext("2d");
						i.drawImage(a.playImage, a.posX, a.posY, a.playImage.width, a.playImage.height)
					}
					for (var o = 0; o < this.fontData.length; o++) {
						var s = this.fontData[o];
						i.font = s.font, i.lineWidth = s.lineWidth, i.fillStyle = s.fillStyle, i.textAlign = s.textAlign, i.strokeStyle = s.strokeStyle, i.strokeText(s.des.toString(), s.posX, s.posY), i.fillText(s.des.toString(), s.posX, s.posY)
					}
					var r = t.toDataURL("image/png");
					null != this.drawCompleteFun && this.drawCompleteFun(r)
				} else this.drawFun()
			}
		}), cc._RF.pop()
	}, {}],
	GameData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f53f6l9SXJMepgZjy/HbMF0", "GameData"), cc.Class({
			properties: {
				isInit: null,
				dataDic: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.dataDic = new Object)
			},
			analysisJsonData: function(e, t) {
				if (null == this.dataDic[e]) {
					var n = cc.loader.getRes(t);
					if (null != n) {
						n = n.json;
						for (var a = new Object, i = 1; i < n.length; i++) {
							for (var o = new Object, s = 0; s < n[i].length; s++) "null" != n[i][s] ? o[n[0][s]] = n[i][s] : o[n[0][s]] = "";
							a[n[i][0]] = o
						}
						this.dataDic[e] = a
					} else ccLog("\u914d\u7f6e\u7684" + e + "JSON\u6587\u4ef6\u7f3a\u5931")
				} else ccLog("\u914d\u7f6e\u7684" + e + "JSON\u6587\u4ef6\u5df2\u7ecf\u88ab\u521d\u59cb\u5316\u4e86")
			}
		}), cc._RF.pop()
	}, {}],
	GameEventConfig: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ee869McurhGq7IqzGTzArBx", "GameEventConfig"), window.register_event_id = {
			CREATEPLAYER_EVENT: "10001",
			HOLDINGBALL: "10002",
			SEND_MY_PLAYER_POS: "10003",
			START_GAME: "10004",
			ENTER_FIGHT_SCENE: "10005",
			OPEN_WIN_LAYER: "10006",
			OPEN_LOSE_LAYER: "10007",
			OPEN_RELIVE_LAYER: "10008",
			OPEN_SKIN_SHOP_LAYER: "10009",
			SCROE_GET: "10010",
			CHANGE_SKIN: "10011",
			EXTRA_TIME_GAME: "10012",
			ENTER_MAIN_SCENE: "10013",
			ADD_RUN_PARTICLE: "10014",
			DELETE_RUN_PARTICLE: "10015",
			CHANGE_PLAYER_SKIN: "10016",
			CLOSE_FINGER_TIPS: "10017",
			ADD_COLLISION_EFFECT: "10018",
			OPEN_MESSAGE_BOX: "10019",
			OPEN_TIPS_VIEW: "10020",
			OPEN_DEMO_SKIN_GET: "10021",
			OPEN_RANK_LAYER: "10022",
			OPEN_LITTLE_RANK: "10023",
			OPEN_RANK_UP_LAYER: "10024",
			REFRESH_GEM_NUM: "10025",
			OPEN_BUY_GEM_VIEW: "10026",
			GEM_TYPE_START_GAME: "10027"
		}, window.MyGameEvent = {
			openView: "openView",
			createPrefab: "createPrefab",
			start_game: "start_game",
			enter_fight: "enter_fight",
			change_skin: "change_skin",
			fireball: "fireball",
			REFRESH_GEM_NUM: "REFRESH_GEM_NUM",
			change_player_skin: "change_player_skin",
			removeAdLoading: "removeAdLoading",
			showBlackMaskRun: "showBlackMaskRun",
			blackMaskRunEnd: "blackMaskRunEnd",
			removeGuideFinger: "removeGuideFinger",
			readyGetBall: "readyGetBall",
			resetAllBot: "resetAllBot",
			resetAllPos: "resetAllPos",
			stopWaitReset: "stopWaitReset",
			mul_game_reset: "mul_game_reset",
			scriptOb: null,
			init: function() {
				this.scriptOb = cc.find("eventnode")
			},
			emit: function(e, t) {
				this.scriptOb.emit(e, t)
			},
			on: function(e, t, n) {
				this.scriptOb.on(e, t, n)
			},
			off: function(e, t, n) {
				this.scriptOb.off(e, t, n)
			}
		}, cc._RF.pop()
	}, {}],
	GameEventManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "8813979KH1OgIHXTxSRSVwC", "GameEventManager"), cc.Class({
			extends: cc.Class,
			properties: {},
			initialize: function() {},
			on: function(e, t, n) {
				cc.find("eventnode").on(e, t, n)
			},
			off: function(e, t, n) {
				cc.find("eventnode").off(e, t, n)
			},
			emit: function(e, t) {
				cc.find("eventnode").emit(e, t)
			}
		}), cc._RF.pop()
	}, {}],
	GameExternalImage: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b3c6ek3Q+xG3rJrl/qx2ZZu", "GameExternalImage"), cc.Class({
			extends: cc.Node,
			properties: {
				animationSprite: null
			},
			loadImage: function(e, t, n, a) {
				this.animationSprite = this.addComponent(cc.Sprite), null != t && (this.animationSprite.spriteFrame = t, null != n && (this.scaleX = n / this.getContentSize().width), null != a && (this.scaleY = a / this.getContentSize().height));
				var i = engine.gameMemoryManagement.getExternalImage(e),
					o = this;
				null == i ? (loadExternalImage(e), this.animationSprite.update = function() {
					var t = engine.gameMemoryManagement.getExternalImage(e);
					null != t && (o.animationSprite.update = function() {}, o.animationSprite.spriteFrame = t, null != n && (o.scaleX = n / o.getContentSize().width), null != a && (o.scaleY = a / o.getContentSize().height))
				}) : (this.animationSprite.spriteFrame = i, null != n && (o.scaleX = n / o.getContentSize().width), null != a && (o.scaleY = a / o.getContentSize().height))
			}
		}), cc._RF.pop()
	}, {}],
	GameGlobal: [function(e, t) {
		"use strict";
		cc._RF.push(t, "67c1dN8kiRCSrI/wFvm3VQA", "GameGlobal");
		var n = e("FaceBookSDK"),
			a = e("GameConfigData");
		window.engineGlobal = {
			gameFrame: 40,
			playEffectMinTime: 300,
			loadSoundDic: new Object,
			gamelanguage: 1,
			gameWidth: 720,
			gameHeigh: 1280,
			viewGameWidth: 720,
			viewGameHeigh: 1280
		}, window.getLanguageResName = function(e) {
			var t = sdkLocaleToResDic[e];
			return null == t && (t = sdkLocaleToResDic.en_US), t.resName
		}, window.faceBookSDK = "FaceBookSDK", window.faceBookSDKTest = "FaceBookSDKTest", window.getChooseMessageVersions = 1, window.errorServerUrl = "https://sendsmgvt.9191youxi.com:8080/rugby_err", window.localServerUrl = "https://sendsmgvt.9191youxi.com:8080/rugby_err", window.lineServerUrl = "https://sendsmgvt.9191youxi.com:8080/rugby_err", window.gameSDKName = faceBookSDK, window.gameSDK = null, window.gameVersions = "20190108_v3", window.gameAppID = "493439584846411", window.UIzIndexInfo = {
			UIBgimgzIndex: -1,
			UIBottomzIndex: 1e3,
			UIMiddlezIndex: 2e3,
			UIMiddlezIndex2: 2100,
			UIMiddlezIndex3: 2200,
			UITopzIndex: 3e3,
			UIConfirmzIndex: 4e3,
			UIConfirmzIndex2: 4100,
			UIEffectIndex: 5e3,
			UIEffectIndex2: 5100,
			UINovicezIndex: 6e3,
			UILoadzIndex: 7e3,
			UICartoonIndex: 8e3
		}, window.heroData = null, window.gameConfigData = null, window.gameAnimationConfig = null, window.initGame = function() {
			gameConfigData = new a, gameConfigData.initialize()
		}, window.initGameSDK = function() {
			switch (window.gameSDKName) {
				case faceBookSDKTest:
					errorServerUrl = localServerUrl, gameSDK = new n, gameSDK.initialize();
					break;
				case faceBookSDK:
					errorServerUrl = lineServerUrl, gameSDK = new n, gameSDK.initialize()
			}
		}, window.shareOrAdList = [4, 2, 4, 3], window.CFG = {
			reset: function() {
				CFG.waitForStart = 1, CFG.myPerson = null, CFG.ballCanTouch = 1, CFG.canControl = 1, CFG.takeBallPerson = null, CFG.ballPos = null, CFG.startGameData = null, CFG.fireStartTime = 0, CFG.showVictory = 0, CFG.tackleHappenTime = 0, CFG.tackleEnemyHappenTime = 0, CFG.sendBallToOther = 0, CFG.sendBallToOtherEnemy = 0, CFG.allMemberPos = {}, CFG.mapMemberPos = {}, CFG.allMemberSpeed = {}, CFG.randomOtherTeamId = 0, CFG.gameWin = 0, CFG.winTimes = 0
			},
			waitForStart: 1,
			myPerson: null,
			ballCanTouch: 1,
			canControl: 1,
			takeBallPerson: null,
			ballPos: null,
			startGameData: null,
			myPlayerPos: null,
			fireStartTime: 0,
			both_attr: "both_attr",
			showVictory: 0,
			tackleHappenTime: 0,
			tackleEnemyHappenTime: 0,
			sendBallToOther: 0,
			sendBallToOtherEnemy: 0,
			allMemberPos: {},
			mapMemberPos: {},
			allMemberSpeed: {},
			randomOtherTeamId: 0,
			scheduleManager: null,
			tempShowPlayerId: 1001,
			tempShowBallId: 2001,
			gameWin: 0,
			winTimes: 0,
			readyOverNpcNum: 0,
			testPlayerCount: 0,
			fightBot: null,
			difficult: 1,
			teamName: {
				1: "argentina",
				2: "barcelona",
				3: "bayern",
				4: "brazil",
				5: "france",
				6: "germany",
				7: "italy",
				8: "juventus",
				9: "manchester_city",
				10: "netherlands",
				11: "real_madrid",
				12: "spain"
			},
			ballName: {
				1: "soccer",
				2: "basketball",
				3: "colourball",
				4: "pokeball",
				5: "billiards",
				6: "watermelon",
				7: "tomato",
				8: "orange",
				9: "chocolate",
				10: "ice",
				11: "cheese",
				12: "tennis"
			},
			taskFlushTime: 864e5,
			forFBCheck: 0,
			s_game_camera_ratio: .8,
			continueWinTimesWithAttr: 0,
			currentFightScene: 0,
			continueFailTimes: 0,
			moreGameBtnClick: 0,
			refresGetAdshTime: 0,
			mul_game_fee: 0,
			mul_game_seed: 0,
			mul_game_win_time: 0,
			mul_game_model: 0,
			mul_game_score: [0, 0],
			mul_game_count_time: 0,
			mul_game_time: 60,
			mul_game_bot: null,
			mul_game_fail_person_photo_arr: [],
			mul_game_forever_model: 0
		}, window.moreGameInfo = {
			1: {
				name: "Pop Stone 2",
				id: "1394792680649041",
				des: "Compete for higher scores with friends"
			},
			2: {
				name: "Jelly Crush",
				id: "1219338561447280",
				des: "Idle Elimination & Block Puzzle"
			},
			3: {
				name: "Shopping Mall Tycoon",
				id: "470679687177324",
				des: "Make money by running a store"
			},
			4: {
				name: "Yatzy with Friends",
				id: "420257448748063",
				des: "Dice Tournament  & Yahtzee"
			}
		}, window.npcActions = {
			run: "run",
			slide_tackle: "slide_tackle",
			shoot: "shoot",
			victory: "victory",
			free: "free"
		}, window.gamePlayCFG = {
			flushContinueWinAttr: function() {
				if (CFG.continueWinTimesWithAttr > 3) {
					var e = CFG.continueWinTimesWithAttr - 3;
					this.continueWinAttrArr[3] = .05 * e + 1, this.continueWinAttrArr[4] = .05 * e + 1, this.continueWinAttrArr[5] = .05 * e + 1, this.continueWinAttrArr[9] = 1 - .05 * e, this.continueWinAttrArr[10] = .05 * e + 1, this.continueWinAttrArr[12] = 1 - .05 * e
				} else this.continueWinAttrArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			},
			selfAttrArr: [],
			enemyAttrArr: [],
			skillAttrArr: [],
			continueWinAttrArr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			tackleFreezeTime: 0,
			tacklePercent: 1,
			addSpeed: 2,
			maxRunSpeed: 3,
			maxForceRunSpeed: 4,
			maxTakeBallSpeed: 5,
			tackleDis: 6,
			tackleBallDis: 7,
			shootDis: 8,
			tackleLostControlTime: 9,
			shootHappenDis: 10,
			forceAddSpeed: 11,
			thinkWhereRun: 12,
			enemyAttr1_f: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 1e3, 1, 800],
			enemyAttr1_b: [300, .1, .2, 7, 9.5, 8.5, 600, 1, 600, 2e3, 600, 1, 800],
			enemyAttr1_d: [300, .2, .2, 7, 9.5, 8.5, 600, 1, 600, 2e3, 600, 1, 800],
			friendAttr1_f: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 800, 1, 1e3],
			friendAttr1_b: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 600, 1, 1e3],
			friendAttr1_d: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 600, 1, 1e3],
			selfAttr1: [0, 0, .2, 7, 10, 9, 600, 1, 600, 2e3, 0, 1, 0],
			enemyAttr2_f: [300, .1, .25, 8, 10, 9, 500, 1, 1e3, 2500, 1e3, 1.3, 550],
			enemyAttr2_b: [300, .2, .25, 7.5, 10, 9, 600, 1, 600, 2e3, 600, 1.3, 550],
			enemyAttr2_d: [300, .3, .25, 7.5, 10, 9, 600, 1, 600, 2e3, 600, 1.3, 550],
			friendAttr2_f: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 800, 1, 1e3],
			friendAttr2_b: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 600, 1, 1e3],
			friendAttr2_d: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 600, 1, 1e3],
			selfAttr2: [0, 0, .2, 7, 10, 9, 600, 1, 700, 2e3, 0, 1, 1e3],
			enemyAttr3_f: [250, .1, .25, 8.5, 10, 9, 500, 1, 1e3, 2e3, 1e3, 1.5, 250],
			enemyAttr3_b: [250, .2, .25, 8, 10, 9, 600, 1, 600, 1500, 600, 1.5, 250],
			enemyAttr3_d: [250, .3, .25, 8, 10, 9, 600, 1, 600, 1500, 600, 1.5, 250],
			friendAttr3_f: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 800, 2500, 1e3, 1, 800],
			friendAttr3_b: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 600, 1, 800],
			friendAttr3_d: [300, .06, .2, 7, 9.5, 8.5, 500, 1, 600, 2500, 600, 1, 800],
			selfAttr3: [0, 0, .2, 7, 10, 9, 600, 1, 700, 2e3, 0, 1, 1e3],
			enemyAttr4_f: [300, .1, .3, 8.5, 10.5, 9.5, 600, 1, 600, 2500, 1e3, 1.2, 800],
			enemyAttr4_b: [300, .2, .25, 8.5, 10.5, 9.5, 650, 1, 600, 2e3, 600, 1.2, 800],
			enemyAttr4_d: [300, .2, .25, 8.5, 10.5, 9.5, 650, 1, 600, 2e3, 600, 1.2, 800],
			friendAttr4_f: [300, .1, .2, 8, 10, 9.5, 550, 1, 600, 2500, 800, 1.2, 900],
			friendAttr4_b: [300, .1, .2, 8, 10, 9.5, 550, 1, 600, 2500, 600, 1.2, 900],
			friendAttr4_d: [300, .1, .2, 8, 10, 9.5, 550, 1, 600, 2e3, 600, 1.2, 900],
			selfAttr4: [0, 0, .2, 7, 10, 9, 600, 1, 700, 2e3, 0, 1, 1e3],
			enemyAttr5_f: [200, .1, .3, 8.5, 11, 9.5, 600, 1, 600, 2500, 1e3, 1.5, 550],
			enemyAttr5_b: [200, .2, .25, 8.5, 10.5, 10, 650, 1, 600, 2e3, 600, 1.5, 550],
			enemyAttr5_d: [200, .3, .25, 8.5, 10.5, 10, 650, 1, 600, 2e3, 600, 1.5, 550],
			friendAttr5_f: [300, .1, .2, 8, 10, 9.5, 550, 1, 600, 2500, 800, 1.2, 900],
			friendAttr5_b: [300, .1, .2, 8, 10, 9.5, 550, 1, 600, 2500, 600, 1.2, 900],
			friendAttr5_d: [300, .1, .2, 8, 10, 9.5, 550, 1, 600, 2e3, 600, 1.2, 900],
			selfAttr5: [0, 0, .2, 7, 10, 9, 600, 1, 700, 2e3, 0, 1, 1e3],
			enemyAttr6_f: [300, .2, .2, 9, 11, 10.5, 600, 1, 700, 2e3, 1100, 2, 200],
			enemyAttr6_b: [300, .4, .2, 8, 10.5, 10, 650, 1, 600, 1800, 1e3, 2, 200],
			enemyAttr6_d: [300, .5, .2, 8, 10.5, 10, 650, 1, 600, 1500, 600, 2, 200],
			friendAttr6_f: [300, .1, .2, 8, 10, 10, 600, 1, 600, 2500, 800, 1.2, 800],
			friendAttr6_b: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2500, 600, 1.2, 800],
			friendAttr6_d: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.2, 800],
			selfAttr6: [0, 0, .2, 8, 12, 10.5, 650, 1, 700, 2e3, 0, 1, 0],
			enemyAttr7_f: [300, .2, .2, 9, 11, 10.5, 600, 1, 800, 1500, 1200, 1.4, 700],
			enemyAttr7_b: [300, .3, .2, 8, 10, 9.5, 650, 1, 600, 1e3, 1e3, 1.4, 700],
			enemyAttr7_d: [300, .3, .2, 8, 10, 9.5, 650, 1, 600, 1e3, 600, 1.4, 700],
			friendAttr7_f: [300, .1, .2, 8, 10, 10, 600, 1, 600, 2500, 800, 1.4, 900],
			friendAttr7_b: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.4, 850],
			friendAttr7_d: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.4, 800],
			selfAttr7: [0, 0, .2, 8, 12, 10.5, 650, 1, 600, 2e3, 0, 1, 0],
			enemyAttr8_f: [200, .2, .2, 9.5, 11.5, 11, 600, 1, 900, 2e3, 1300, 1.8, 500],
			enemyAttr8_b: [200, .4, .2, 9, 11, 10, 650, 1, 600, 1800, 1e3, 1.8, 500],
			enemyAttr8_d: [200, .4, .2, 9, 11, 10, 650, 1, 600, 1500, 600, 1.8, 500],
			friendAttr8_f: [300, .1, .2, 8, 10, 10, 600, 1, 600, 2500, 800, 1.4, 900],
			friendAttr8_b: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.4, 850],
			friendAttr8_d: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.4, 800],
			selfAttr8: [0, 0, .2, 8, 12, 10.5, 650, 1, 600, 2e3, 0, 1, 0],
			enemyAttr9_f: [150, .2, .4, 10, 12, 11, 600, 1, 900, 1800, 1300, 2, 200],
			enemyAttr9_b: [150, .4, .3, 9.5, 11, 10, 650, 1, 600, 1500, 1e3, 2, 200],
			enemyAttr9_d: [150, .4, .3, 9.5, 11, 10, 650, 1, 600, 1200, 600, 2, 200],
			friendAttr9_f: [300, .1, .2, 8, 10, 10, 600, 1, 600, 2500, 800, 1.4, 900],
			friendAttr9_b: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.4, 850],
			friendAttr9_d: [300, .2, .2, 8, 10, 9.5, 600, 1, 600, 2e3, 600, 1.4, 800],
			selfAttr9: [0, 0, .2, 8, 12, 10.5, 650, 1, 600, 2e3, 0, 1, 0],
			enemyAttr10_f: [250, .3, .3, 9.5, 12, 11, 650, 1, 900, 1800, 1300, 1.5, 550],
			enemyAttr10_b: [250, .4, .3, 9.5, 11, 10.5, 700, 1, 600, 1500, 1e3, 1.5, 550],
			enemyAttr10_d: [250, .5, .3, 9.5, 11, 10.5, 700, 1, 600, 1200, 600, 1.5, 550],
			friendAttr10_f: [300, .2, .2, 8.5, 11, 10, 650, 1, 600, 2500, 800, 1, 800],
			friendAttr10_b: [300, .3, .2, 8.5, 11, 10, 650, 1, 600, 2e3, 600, 1, 800],
			friendAttr10_d: [300, .3, .2, 8.5, 11, 10, 650, 1, 600, 2e3, 600, 1, 800],
			selfAttr10: [0, 0, .2, 9, 12, 11, 700, 1, 600, 2e3, 0, 1, 0],
			enemyAttr11_f: [150, .3, .2, 10, 12.5, 11.5, 650, 1, 1e3, 2e3, 1400, 2, 150],
			enemyAttr11_b: [150, .5, .2, 10, 11.5, 11, 700, 1, 600, 1800, 1e3, 2, 150],
			enemyAttr11_d: [150, .6, .2, 10, 11.5, 11, 700, 1, 600, 1500, 600, 2, 150],
			friendAttr11_f: [300, .2, .2, 8.5, 11, 10, 650, 1, 600, 2500, 800, 1.5, 650],
			friendAttr11_b: [300, .3, .2, 8.5, 11, 10, 650, 1, 600, 2e3, 600, 1.5, 650],
			friendAttr11_d: [300, .3, .2, 8.5, 11, 10, 650, 1, 600, 2e3, 600, 1.5, 650],
			selfAttr11: [0, 0, .2, 9, 12, 11, 700, 1, 600, 2e3, 0, 1, 0],
			enemyAttr12_f: [200, .4, .2, 9.5, 13, 11, 650, 1, 700, 2e3, 1100, 1.8, 500],
			enemyAttr12_b: [200, .5, .2, 9.5, 11, 10.5, 700, 1, 600, 1800, 1e3, 1.8, 500],
			enemyAttr12_d: [200, .6, .2, 9.5, 11, 10.5, 700, 1, 600, 1500, 600, 1.8, 500],
			friendAttr12_f: [300, .2, .2, 8.5, 11, 10, 650, 1, 600, 2500, 800, 1.5, 650],
			friendAttr12_b: [300, .3, .2, 8.5, 11, 10, 650, 1, 600, 2e3, 600, 1.5, 650],
			friendAttr12_d: [300, .3, .2, 8.5, 11, 10, 650, 1, 600, 2e3, 600, 1.5, 650],
			selfAttr12: [0, 0, .2, 9, 12, 11, 700, 1, 600, 2e3, 0, 1, 0],
			enemyAttr13_f: [150, .4, .2, 10, 14.5, 13.5, 650, 1, 1100, 800, 1100, 2, 100],
			enemyAttr13_b: [150, .5, .2, 10, 13.5, 12.5, 700, 1, 900, 500, 1e3, 2, 100],
			enemyAttr13_d: [150, .6, .2, 10, 13.5, 12.5, 700, 1, 900, 500, 600, 2, 100],
			friendAttr13_f: [300, .2, .2, 9, 11, 10, 650, 1, 600, 2500, 800, 1, 650],
			friendAttr13_b: [300, .3, .2, 9, 11, 10, 650, 1, 600, 2e3, 600, 1, 650],
			friendAttr13_d: [300, .3, .2, 9, 11, 10, 650, 1, 600, 2e3, 600, 1, 650],
			selfAttr13: [0, 0, .2, 9, 12, 11, 700, 1, 600, 2e3, 0, 1, 0],
			enemyAttr14_f: [150, .5, .2, 10, 16, 15.5, 650, 1, 1200, 800, 1100, 3, 0],
			enemyAttr14_b: [150, .6, .2, 10, 15, 14.5, 700, 1, 900, 500, 1e3, 3, 0],
			enemyAttr14_d: [150, .7, .2, 10, 15, 14.5, 700, 1, 900, 500, 600, 3, 0],
			friendAttr14_f: [300, .2, .2, 9, 11, 10, 650, 1, 600, 2500, 800, 1, 650],
			friendAttr14_b: [300, .3, .2, 9, 11, 10, 650, 1, 600, 2e3, 600, 1, 650],
			friendAttr14_d: [300, .3, .2, 9, 11, 10, 650, 1, 600, 2e3, 600, 1, 650],
			selfAttr14: [0, 0, .2, 9, 12, 11, 700, 1, 600, 2e3, 0, 1, 0]
		}, window.Util = {
			getLanguage: function(e, t) {
				var n = engine.gameData.dataDic.language[e];
				if (n) return (n = n[engineGlobal.gamelanguage]) ? (t && (n = "Arabic" == engineGlobal.gamelanguage ? (n = n.replace("s%", t)).replace("t%", t) : (n = n.replace("%s", t)).replace("%t", t)), cc.log("\u3010" + e + "\u3011language : " + n), n) : (cc.error("\u8bed\u8a00\u4e0d\u5b58\u5728!!!:", engineGlobal.gamelanguage), "\u7f3a\u5931");
				cc.error("\u8bed\u8a00\u8868\u91cc\u4e0d\u5b58\u5728:", e)
			},
			getCFGValue: function(e, t) {
				var n = ["_f", "_f", "_b", "_b", "_d", "_d"][t.getComponent(CFG.both_attr).type],
					a = t.getComponent(CFG.both_attr).isEnemy,
					i = t.getComponent(CFG.both_attr).isSelf,
					o = "enemyAttr";
				a || (o = i ? "selfAttr" : "friendAttr"), CFG.difficult = 1;
				var s = 0,
					r = o + CFG.difficult + n;
				return i ? (r = o + CFG.difficult, s = gamePlayCFG[r][e] + (gamePlayCFG.skillAttrArr[e] || 0), 9 == e && (s = Math.max(400, s))) : a ? (s = heroData.getLv() > 3 ? gamePlayCFG[r][e] + (gamePlayCFG.enemyAttrArr[e] || 0) : gamePlayCFG[r][e], s *= gamePlayCFG.continueWinAttrArr[e], 9 == e && (s = Math.max(s, 400)), 10 == e && (s = Math.min(s, 5)), 12 == e && (s = Math.max(s, 100))) : s = gamePlayCFG[r][e] + (gamePlayCFG.selfAttrArr[e] || 0), s
			},
			setPic: function(e, t) {
				e || cc.error("setPic error:", e, t), cc.loader.loadRes(t, cc.SpriteFrame, function(t, n) {
					e.isValid && e.getComponent(cc.Sprite) && (e.getComponent(cc.Sprite).spriteFrame = n)
				})
			},
			objDeepCopy: function(e) {
				var t = e instanceof Array ? [] : {};
				for (var n in e) t[n] = "object" == typeof e[n] ? Util.objDeepCopy(e[n]) : e[n];
				return t
			},
			createHeadNode: function(e, t) {
				if ("testhead" == e && (e = cc.url.raw("resources/testhead.png")), "bot" == e.substr(0, 3)) {
					var n = new cc.Node;
					return n.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimgp1_plist, e), n.scale = t / n.width, n
				}
				var a = new GameExternalImage;
				return a.loadImage(e, null, t, t), a
			},
			shuffleArray: function(e) {
				for (var t, n, a = e.length; a;) n = Math.floor(Math.random() * a--), t = e[a], e[a] = e[n], e[n] = t;
				return e
			},
			formatTime: function(e) {
				var t = parseInt(e / 1e3);
				return ("00" + parseInt(t / 3600)).slice(-2) + ":" + ("00" + parseInt(t % 3600 / 60)).slice(-2) + ":" + ("00" + t % 60).slice(-2)
			},
			delSameV2Arr: function(e) {
				function t(e, t) {
					for (var n = e.length - 1; n >= 0; n--)
						if (t.equals(e[n])) return n;
					return -1
				}
				for (var n = e.slice(), a = 0; a < n.length; a++) {
					var i = t(n, n[a]);
					i != a && (n.splice(i, 1), a--)
				}
				return n
			},
			shufferArryBySeed: function(e, t) {
				for (var n, a, i, o = 0, s = 0; s < t % 7; s++) void 0, void 0, a = (n = e).length - 1, i = n[a], n.splice(a, 1), o++ % 2 == 0 ? n.push(i) : n.unshift(i), e = n;
				return e
			},
			getRandomBySeed: function(e, t, n) {
				return (t = t || 0) + (9301 * e + 49297) % 233280 / 233280 * ((n = n || 1) - t)
			}
		}, cc._RF.pop()
	}, {
		FaceBookSDK: "FaceBookSDK",
		GameConfigData: "GameConfigData"
	}],
	GameLanguageLabel: [function(e, t) {
		"use strict";
		cc._RF.push(t, "31324GQaSRF6ILvCzIPhNDd", "GameLanguageLabel"), cc.Class({
			extends: cc.Component,
			properties: {
				dic: "language",
				_key: "",
				key: {
					set: function(e) {
						this._key = e, this.refreshString()
					},
					get: function() {
						return this._key
					}
				},
				column: "content"
			},
			onDestroy: function() {
				this.dic = null, this.key = null, this.column = null, null != this.node && (this.node.setLanguageKey = null)
			},
			onLoad: function() {
				this.node.setLanguageKey = function(e) {
					this.getComponent("GameLanguageLabel").key = e
				}, this.refreshString()
			},
			refreshString: function() {
				"undefined" != typeof engine && "" != this._key && (this.node.getComponent(cc.Label).string = engine.gameData.dataDic[this.dic][this._key][this.column])
			}
		}), cc._RF.pop()
	}, {}],
	GameLanguageSprite: [function(e, t) {
		"use strict";
		cc._RF.push(t, "71e61umQH9Faq5CyrBFBbFh", "GameLanguageSprite"), window.LanguageStyleType = cc.Enum({
			chinese: 0,
			English: 1,
			Indonisian: 2,
			Vietemnese: 3,
			Hindi: 4,
			Thai: 5,
			Portuguese: 6,
			Arabic: 7
		}), cc.Class({
			extends: cc.Component,
			properties: {
				_language: 1,
				_dataInfo: null,
				_pngURL: null,
				_pngX: 0,
				_pngY: 0,
				language: {
					type: LanguageStyleType,
					set: function(e) {
						this._language = e, this.refreshSprite()
					},
					get: function() {
						return this.refreshSprite(), this._language
					}
				},
				pngURL: {
					type: cc.SpriteFrame,
					set: function(e) {
						this._pngURL = e, this.saveDataInfo(), this.refreshSprite()
					},
					get: function() {
						return this._pngURL
					}
				},
				pngX: {
					set: function(e) {
						this._pngX = e, this.saveDataInfo(), this.refreshSprite()
					},
					get: function() {
						return this._pngX
					}
				},
				pngY: {
					set: function(e) {
						this._pngY = e, this.saveDataInfo(), this.refreshSprite()
					},
					get: function() {
						return this._pngY
					}
				}
			},
			createLanguage: function() {
				if (null == this._dataInfo)
					for (var e in this._dataInfo = {}, LanguageStyleType) this._dataInfo[LanguageStyleType[e]] = {};
				null == this._dataInfo[this._language] && (this._dataInfo[this._language] = {})
			},
			onLoad: function() {
				this._language = engineGlobal.languageStyle, this.refreshSprite()
			},
			saveDataInfo: function() {
				this.createLanguage(), this._dataInfo[this._language].x = this._pngX, this._dataInfo[this._language].y = this._pngY, this._dataInfo[this._language].png = this._pngURL
			},
			refreshSprite: function() {
				this.createLanguage();
				var e = this._dataInfo[this._language];
				if (null != e) {
					var t = this.node.getComponent(cc.Sprite);
					void 0 !== e.png && null != e.png && (t.spriteFrame = e.png, this.node.width = t.spriteFrame.getOriginalSize().width, this.node.height = t.spriteFrame.getOriginalSize().height, this._pngURL = t.spriteFrame), void 0 !== e.x && null != e.x && (this.node.x = e.x, this._pngX = e.x), void 0 !== e.y && null != e.y && (this.node.y = e.y, this._pngY = e.y)
				}
			}
		}), cc._RF.pop()
	}, {}],
	GameListLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ef63eWdiYxLDZOfn5NpJTjn", "GameListLayer"), cc.Class({
			extends: cc.Component,
			properties: {
				nodeUIList: null,
				nodeDataList: null,
				createUIFun: null,
				keyNum: null,
				borderPos1: null,
				borderPos2: null,
				initPoint: null,
				curPoint: null,
				isStop: null
			},
			onDestroy: function() {
				this.nodeUIList = null, this.nodeDataList = null, this.createUIFun = null, this.keyNum = null, this.borderPos1 = null, this.borderPos2 = null, this.initPoint = null, this.curPoint = null, this.isStop = null
			},
			setData: function(e) {
				this.nodeUIList = [], this.nodeDataList = [], this.initPoint = e.initPoint, this.curPoint = null, this.isStop = !1, this.keyNum = 1e3, this.borderPos1 = e.borderPos1, this.borderPos2 = e.borderPos2;
				for (var t = 0; t < e.nodeDatas.length; t++) {
					var n = new Object;
					n.data = e.nodeDatas[t], n.dataKey = this.keyNum, n.isAdd = !1, this.nodeDataList.push(n), this.keyNum++
				}
				this.createUIFun = e.createUIFun
			},
			refreshNodeData: function(e) {
				var t = new Object;
				t.data = e, t.dataKey = this.keyNum, t.isAdd = !1, this.nodeDataList.push(t), this.keyNum++
			},
			refreshBorder: function(e) {
				this.borderPos1 = e.borderPos1, this.borderPos2 = e.borderPos2, this.refurbishUI()
			},
			updateView: function(e) {
				1 != this.isStop && this.curPoint != e && (this.curPoint = e, this.refurbishUI())
			},
			setStop: function(e) {
				this.isStop = e
			},
			refurbishUI: function() {
				for (var e = 0; e < this.nodeDataList.length; e++) {
					var t = this.nodeDataList[e];
					(a = this.curPoint + t.data.pos) <= this.borderPos1 && a >= this.borderPos2 && 0 == t.isAdd && (t.isAdd = !0, (i = this.createUIFun(t.data)).dataKey = t.dataKey, this.nodeUIList.push(i))
				}
				for (var n = this.nodeUIList.length - 1; n >= 0; n--) {
					var a, i = this.nodeUIList[n];
					t = this.getNodeDataByDataKey(i.dataKey), ((a = this.curPoint + t.data.pos) > this.borderPos1 || a < this.borderPos2) && (t.isAdd = !1, i.destroy(), this.nodeUIList.splice(n, 1))
				}
			},
			clear: function() {
				for (; this.nodeUIList.length > 0;) this.nodeUIList.shift().destroy();
				for (; this.nodeDataList.length > 0;) {
					var e = this.nodeDataList.shift();
					e.data = null, e.dataKey = null, e.isAdd = null
				}
				this.curPoint = this.initPoint
			},
			removeData: function(e) {
				for (var t = this.nodeDataList.length - 1; t >= 0; t--)
					if (this.nodeDataList[t].dataKey == e) return void this.nodeDataList.splice(t, 1)
			},
			removeNodeUI: function(e) {
				for (var t = this.nodeUIList.length - 1; t >= 0; t--)
					if (this.nodeUIList[t].dataKey == e) return void this.nodeUIList.splice(t, 1)
			},
			getNodeDataByDataKey: function(e) {
				for (var t = 0; t < this.nodeDataList.length; t++)
					if (this.nodeDataList[t].dataKey == e) return this.nodeDataList[t];
				return null
			}
		}), cc._RF.pop()
	}, {}],
	GameLoadPrefabLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0fca3aF0S1JEJTg88tkKsV6", "GameLoadPrefabLayer"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				callFun: null
			},
			onDestroy: function() {
				this.isInit = null, this.callFun = null
			},
			destroyNode: function() {
				this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.destroy()
			},
			initialize: function(e) {
				if (1 != this.isInit) {
					this.isInit = !0, this.callFun = e.callFun;
					var t = e.curLoadPreConfig,
						n = this.node.getChildByName("bgsp");
					null != n && (n.y = t.bgY, n.width = t.bgWidth, n.height = t.bgHeight);
					var a = this.node.getChildByName("closebtn");
					null != a && (null != t.closeX ? (a.y = t.closeY, a.x = t.closeX) : a.active = !1, a.on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this));
					var i = this.node.getChildByName("circleimg");
					if (null != i) {
						i.scale = t.circleScale;
						var o = cc.rotateBy(2, 360);
						o.repeatForever(), i.y = t.circleY, i.runAction(o)
					}
					var s = this.node.addComponent("GameLoadPrefab");
					this.node.loadPrefabComplete = this.loadPrefabComplete.bind(this), s.loadPrefab(t.loadPrefab)
				}
			},
			loadPrefabComplete: function() {
				null != this.callFun && this.callFun(), this.destroyNode()
			},
			clickClosebtnFun: function() {
				this.destroyNode()
			}
		}), cc._RF.pop()
	}, {}],
	GameLoadPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "10464orw5RCv6fggAGc+Z7n", "GameLoadPrefab"), e("GameBackgroundLoad"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				prefabUrlArr: null,
				isRunUpdate: null
			},
			onDestroy: function() {
				this.isInit = null, this.isRunUpdate = null, this.prefabUrlArr = null
			},
			onLoad: function() {
				this.initialize()
			},
			loadPrefab: function(e) {
				if (this.prefabUrlArr = e, 1 == this.isLoadComplete()) this.node.loadPrefabComplete(), this.destroy();
				else {
					for (var t = 0; t < this.prefabUrlArr.length; t++) 0 == engine.gameMemoryManagement.isExistRes(this.prefabUrlArr[t]) && engine.gameBackgroundLoad.addLoadRes([{
						url: this.prefabUrlArr[t],
						restype: LoadStyleType.prefab
					}]);
					this.isRunUpdate = !0
				}
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0)
			},
			isLoadComplete: function() {
				for (var e = 0; e < this.prefabUrlArr.length; e++)
					if (0 == engine.gameMemoryManagement.isExistRes(this.prefabUrlArr[e])) return !1;
				return !0
			},
			update: function() {
				1 == this.isRunUpdate && 1 == this.isLoadComplete() && (this.node.loadPrefabComplete(), this.destroy())
			}
		}), cc._RF.pop()
	}, {
		GameBackgroundLoad: "GameBackgroundLoad"
	}],
	GameLoadSpine: [function(e, t) {
		"use strict";
		cc._RF.push(t, "587e3jNTplJGbM6ZG3XTrmv", "GameLoadSpine"), e("GameBackgroundLoad"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				spineUrlArr: null,
				isRunUpdate: null
			},
			onDestroy: function() {
				this.spineUrlArr = null
			},
			onLoad: function() {
				this.initialize()
			},
			loadSpine: function(e) {
				if (this.spineUrlArr = e, 1 == this.isLoadComplete()) this.node.loadComplete(), this.destroy();
				else {
					for (var t = 0; t < this.spineUrlArr.length; t++) 0 == engine.gameMemoryManagement.isExistRes(this.spineUrlArr[t]) && engine.gameBackgroundLoad.addLoadRes([{
						url: this.spineUrlArr[t],
						restype: LoadStyleType.spine
					}]);
					this.isRunUpdate = !0
				}
			},
			isLoadComplete: function() {
				for (var e = 0; e < this.spineUrlArr.length; e++)
					if (0 == engine.gameMemoryManagement.isExistRes(this.spineUrlArr[e])) return !1;
				return !0
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0)
			},
			update: function() {
				1 == this.isRunUpdate && 1 == this.isLoadComplete() && (this.node.loadComplete(), this.destroy())
			}
		}), cc._RF.pop()
	}, {
		GameBackgroundLoad: "GameBackgroundLoad"
	}],
	GameLoadSprite: [function(e, t) {
		"use strict";
		cc._RF.push(t, "73d71fNTDhGXb7W7tXRkDZ/", "GameLoadSprite"), e("GameBackgroundLoad"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				spriteAtlas: null,
				pngName: null,
				isRunUpdate: null
			},
			onDestroy: function() {
				this.spriteAtlas = null, this.pngName = null, this.isRunUpdate = null
			},
			onLoad: function() {
				this.initialize()
			},
			loadPng: function(e, t) {
				this.spriteAtlas = e, this.pngName = t, 0 == engine.gameMemoryManagement.isExistRes(e) ? (engine.gameBackgroundLoad.addLoadRes([{
					url: e,
					restype: LoadStyleType.spriteAtlas
				}]), this.isRunUpdate = !0) : (this.node.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(this.spriteAtlas, this.pngName), this.destroy())
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0)
			},
			update: function() {
				1 == this.isRunUpdate && 1 == engine.gameMemoryManagement.isExistRes(this.spriteAtlas) && (this.node.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(this.spriteAtlas, this.pngName), this.destroy())
			}
		}), cc._RF.pop()
	}, {
		GameBackgroundLoad: "GameBackgroundLoad"
	}],
	GameLoadTexture: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5f71b17jqFN66EoH1qBlDZi", "GameLoadTexture"), e("GameBackgroundLoad"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				url: null,
				isRunUpdate: null
			},
			onDestroy: function() {
				this.url = null, this.isRunUpdate = null
			},
			onLoad: function() {
				this.initialize()
			},
			loadPng: function(e) {
				this.url = e, 0 == engine.gameMemoryManagement.isExistRes(this.url) ? (engine.gameBackgroundLoad.addLoadRes([{
					url: this.url,
					restype: LoadStyleType.texture
				}]), this.isRunUpdate = !0) : (this.node.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getTexture(this.url), this.destroy())
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0)
			},
			update: function() {
				1 == this.isRunUpdate && 1 == engine.gameMemoryManagement.isExistRes(this.url) && (this.node.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getTexture(this.url), this.destroy())
			}
		}), cc._RF.pop()
	}, {
		GameBackgroundLoad: "GameBackgroundLoad"
	}],
	GameLog: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f1eee4zBFBMoaLkSWPfM+zD", "GameLog"), cc.Class({
			properties: {
				isInit: null,
				bugLimitCount: null
			},
			initialize: function() {
				if (1 != this.isInit) {
					this.bugLimitCount = 0;
					var e = this;
					window.onerror = function(t, n, a, i, o) {
						if (null != o && null != o.stack && e.bugLimitCount <= 5) {
							e.bugLimitCount++;
							var s = o.stack.toString();
							switch (gameSDKName) {
								case faceBookSDK:
									e.bugInfoHttp(s)
							}
						}
					}
				}
			},
			bugInfoHttp: function() {}
		}), cc._RF.pop()
	}, {}],
	GameMemoryManagement: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e73b647egZN+aJfVXL+6og0", "GameMemoryManagement"), cc.Class({
			properties: {
				isInit: null,
				spriteAtlassDic: null,
				spriteFrameDic: null,
				prefabDic: null,
				jsonDic: null,
				spineDic: null,
				fontDic: null,
				textureDic: null,
				externalImageDic: null,
				particleDic: null,
				soundDic: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.spriteFrameDic = new Object, this.spriteAtlassDic = new Object, this.particleDic = new Object, this.externalImageDic = new Object, this.prefabDic = new Object, this.jsonDic = new Object, this.spineDic = new Object, this.textureDic = new Object, this.fntDic = new Object, this.soundDic = new Object)
			},
			addExternalImage: function(e, t) {
				this.externalImageDic[e] = t
			},
			getExternalImage: function(e) {
				return this.externalImageDic[e]
			},
			addTexture: function(e, t) {
				this.textureDic[e] = new cc.SpriteFrame(t)
			},
			getTexture: function(e) {
				return this.textureDic[e]
			},
			addPrefabDic: function(e, t) {
				this.prefabDic[e] = t, cc.instantiate(t)
			},
			getPrefab: function(e) {
				var t = this.prefabDic[e];
				return null == t ? (ccLog("\u9884\u5236\u4ef6\uff1a" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"), null) : cc.instantiate(t)
			},
			addSoundDic: function(e, t) {
				this.soundDic[e] = t
			},
			getSound: function(e) {
				return this.soundDic[e]
			},
			addFont: function(e, t) {
				this.fntDic[e] = t
			},
			getFont: function(e) {
				return this.fntDic[e]
			},
			addSpine: function(e, t) {
				this.spineDic[e] = t
			},
			getSpine: function(e) {
				var t = this.spineDic[e];
				return null == t ? (ccLog("spine\uff1a" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"), null) : t
			},
			addSpriteAtlasDic: function(e, t) {
				if (null == this.spriteFrameDic[e]) {
					this.spriteAtlassDic[e] = t, this.spriteFrameDic[e] = new Object;
					for (var n = t.getSpriteFrames(), a = 0; a < n.length; a++) this.spriteFrameDic[e][n[a].name] = n[a]
				}
			},
			getSpriteAtlas: function(e) {
				return this.spriteAtlassDic[e]
			},
			getSpriteFrame: function(e, t) {
				var n = this.spriteFrameDic[e];
				if (null != n) {
					var a = n[t];
					return null == a && ccLog("\u56fe\u7247\u540d\u5b57" + t + "\u4e0d\u5bf9\uff01"), a
				}
				return ccLog("\u5408\u56fe\u6587\u4ef6" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"), null
			},
			addparticleDic: function(e, t) {
				null == this.particleDic[e] && (this.particleDic[e] = t)
			},
			getParticle: function(e) {
				var t = this.particleDic[e];
				return null == t ? (ccLog("particle\uff1a" + e + "\u6ca1\u6709\u88ab\u52a0\u8f7d\uff01"), null) : t
			},
			addJsonDic: function(e) {
				var t = cc.loader.getRes(e);
				null != t && (this.jsonDic[e] = t)
			},
			isExistRes: function(e) {
				return null != this.prefabDic[e] || null != this.spriteAtlassDic[e] || null != this.jsonDic[e] || null != this.spineDic[e] || null != this.fntDic[e] || null != this.textureDic[e] || null != this.soundDic[e] || null != this.particleDic[e]
			}
		}), cc._RF.pop()
	}, {}],
	GamePlayPool: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9bed3jdR4pDTrRpiZ+/WDk8", "GamePlayPool"), cc.Class({
			extends: cc.Class,
			properties: {
				particlePool: null
			},
			initialize: function() {
				this.particlePool = new Object, this.particlePool.blaze = new cc.NodePool, this.particlePool.ram = new cc.NodePool, this.particlePool.smoke = new cc.NodePool
			},
			getParticle: function(e) {
				null == this.particlePool[e] && ccLog("1111");
				var t, n = this.particlePool[e].get();
				if (null == n) {
					t = (n = new cc.Node).addComponent(cc.ParticleSystem);
					var a = null;
					switch (e) {
						case "blaze":
							a = mustLoadParticle.blaze_particle;
							break;
						case "ram":
							a = mustLoadParticle.ram_particle;
							break;
						case "smoke":
							a = mustLoadParticle.smoke_particle
					}
					var i = engine.gameMemoryManagement.getParticle(a);
					t.file = i
				} else t = n.getComponent(cc.ParticleSystem);
				return t.resetSystem(), n
			},
			putParticlePool: function(e, t) {
				this.particlePool[e].put(t)
			}
		}), cc._RF.pop()
	}, {}],
	GameRankData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "0a950SfA2FJs4r8kIJteBWg", "GameRankData"), window.rankTypeEm = cc.Enum({
			globalRank: 1,
			friendRank: 2,
			nearbyRank: 3
		}), cc.Class({
			properties: {
				isInit: null,
				nearbyRankData: null,
				globalRankData: null,
				friendRankData: null,
				lastGetFriRankScore: null,
				lastGetNearRankScore: null,
				lastGetGlobRankScore: null,
				globalRankIsEnd: !1,
				friendRankIsEnd: !1,
				myRank: null,
				otherFriendArr: []
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.nearbyRankData = [], this.globalRankData = [], this.friendRankData = [], this.otherFriendArr = [], this.lastGetFriRankScore = 0, this.lastGetNearRankScore = 0, this.lastGetGlobRankScore = 0, this.friendRankIsEnd = !1)
			},
			rankIsChange: function(e) {
				var t = 0;
				switch (e) {
					case rankTypeEm.globalRank:
						t = this.lastGetGlobRankScore;
						break;
					case rankTypeEm.friendRank:
						t = this.lastGetFriRankScore;
						break;
					case rankTypeEm.nearbyRank:
						t = this.lastGetNearRankScore
				}
				return "" == t || t != heroData.getTotalExp()
			},
			loadFriendRankDataBySDK: function() {
				ccLog("get friend rank");
				var e = this.rankIsChange(rankTypeEm.friendRank);
				if (this.friendRankData.length <= 0 || 1 == e) {
					this.lastGetFriRankScore = heroData.getTotalExp(), this.setRankData(rankTypeEm.friendRank, []);
					var t = this;
					gameSDK.leaderboard.getConnectedPlayerEntriesAsync(fbRankName, 100, 0, function(e) {
						t.setRankData(rankTypeEm.friendRank, e), t.friendRankIsEnd = !0, t.otherFriendArr = [];
						for (var n = 0; n < e.length; n++) e[n].playerID != gameSDK.sdkPlayInfo.playerID && t.otherFriendArr.push(e[n]);
						gameConfigData.targetPerson = t.getRandomFriend(), engine.gameEventManager.emit(register_event_id.OPEN_LITTLE_RANK)
					})
				}
			},
			loadGlobalRankDataBySDK: function() {
				ccLog("get global rank");
				var e = this.rankIsChange(rankTypeEm.globalRank);
				if (this.globalRankData.length <= 0 || 1 == e) {
					this.lastGetGlobRankScore = heroData.getTotalExp(), this.setRankData(rankTypeEm.globalRank, []);
					var t = this,
						n = 20 + heroData.rankBuChongNum,
						a = 0;
					gameSDK.leaderboard.getEntriesAsyncInfo(fbRankName, [{
						count: n,
						beginNum: 0
					}], function(e) {
						for (var n = 0; n < e.length; n++)
							if (e[n].data) {
								var i = e[n].data.split("_"),
									o = i[0],
									s = i[1];
								gameConfigData.getLvExpInfo(o).exp < s && (e.splice(n, 1), n--, a++)
							} heroData.rankBuChongNum = a, t.setRankData(rankTypeEm.globalRank, e), t.globalRankIsEnd = !0
					})
				}
			},
			loadNearbyRankDataBySDK: function() {
				this.rankIsChange(rankTypeEm.nearbyRank), this.lastGetNearRankScore = heroData.maxScore, this.setRankData(rankTypeEm.nearbyRank, []);
				var e = this;
				gameSDK.leaderboard.getPlayerEntryAsync(fbRankName, function(t) {
					var n;
					null != t && (n = 1 == t.rank ? 0 : t.rank - 2, gameSDK.leaderboard.getEntriesAsyncInfo(fbRankName, [{
						count: 3,
						beginNum: n
					}], function(n) {
						e.myRank = t.rank, n || (n = []), ccLog("\u9644\u8fd1\u73a9\u5bb6"), ccLog(n), e.setRankData(rankTypeEm.nearbyRank, n), e.friendRankIsEnd = !0
					}))
				})
			},
			setRankData: function(e, t) {
				switch (e) {
					case rankTypeEm.globalRank:
						this.globalRankData = t;
						break;
					case rankTypeEm.friendRank:
						this.friendRankData = t;
						break;
					case rankTypeEm.nearbyRank:
						this.nearbyRankData = t
				}
			},
			getRankData: function(e) {
				switch (e) {
					case rankTypeEm.globalRank:
						return this.globalRankData;
					case rankTypeEm.friendRank:
						return this.friendRankData;
					case rankTypeEm.nearbyRank:
						return this.nearbyRankData
				}
			},
			getRandomFriend: function() {
				if (this.otherFriendArr.length > 0 && 0 == n.length && (n = gameConfigData.objDeepCopy(this.otherFriendArr), n = gameConfigData.shuffleArray(n)), ccLog("\u975e\u81ea\u5df1\u4e4b\u5916\u7684\u5176\u4ed6\u597d\u53cb\uff1a", this.otherFriendArr), ccLog("\u6253\u6563\u6570\u7ec4\uff1a", n), n.length > 0) {
					var e = n.shift();
					return e.type = headType.FRIEND_HEAD, e
				}
				var t = getRandomBot();
				return t.score = Math.max(heroData.getTotalExp() - 10, 0), t.type = headType.BOT_HEAD, t
			}
		});
		var n = [];
		cc._RF.pop()
	}, {}],
	GameSoundButton: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cc6ca2YeRxIG6gx56bV0jpa", "GameSoundButton"), cc.Class({
			extends: cc.Component,
			properties: {
				_soundBtn: null,
				_btnSpriteUrl: null,
				btnSpriteUrl: {
					type: cc.SpriteFrame,
					set: function(e) {
						this.refreshBtnTexture(e)
					},
					get: function() {
						return this._btnSpriteUrl
					}
				},
				_soundIconSp: null,
				_closeSpriteUrl: null,
				closeSpriteUrl: {
					type: cc.SpriteFrame,
					set: function(e) {
						this.refreshSoundTexture(e, 1)
					},
					get: function() {
						return this._closeSpriteUrl
					}
				},
				_openSpriteUrl: null,
				openSpriteUrl: {
					type: cc.SpriteFrame,
					set: function(e) {
						this.refreshSoundTexture(e, 0)
					},
					get: function() {
						return this._openSpriteUrl
					}
				},
				_isInit: null
			},
			onLoad: function() {
				this.initialize()
			},
			onDestroy: function() {
				this._soundBtn.off(cc.Node.EventType.TOUCH_END, this.clickSoundBtnFun, this), this._soundBtn = null, this._btnSpriteUrl = null, this._soundIconSp = null, this._closeSpriteUrl = null, this._openSpriteUrl = null, this._curSoundType = null, this._isInit = null
			},
			initialize: function() {
				1 != this._isInit && (this._isInit = !0, this.createBtn(), this.createSoundIcon(), this.iconChangeTexture(engine.gameSound.stopSound))
			},
			createBtn: function() {
				if (null == this._soundBtn) {
					this._soundBtn = new cc.Node, this._soundBtn.addComponent(cc.Sprite);
					var e = this._soundBtn.addComponent(cc.Button);
					e.transition = cc.Button.Transition.SCALE, e.zoomScale = .9, this.node.addChild(this._soundBtn)
				}
				this._soundBtn.on(cc.Node.EventType.TOUCH_END, this.clickSoundBtnFun, this)
			},
			clickSoundBtnFun: function() {
				1 == engine.gameSound.stopSound ? engine.gameSound.openMusic() : engine.gameSound.stopMusic(), "undefined" != typeof changeMusic && null != changeMusic && changeMusic(), this.iconChangeTexture(engine.gameSound.stopSound)
			},
			createSoundIcon: function() {
				null == this._soundIconSp && (this._soundIconSp = new cc.Node, this._soundIconSp.addComponent(cc.Sprite), this._soundBtn.addChild(this._soundIconSp))
			},
			refreshBtnTexture: function(e) {
				this._btnSpriteUrl = e, this.createBtn(), this._soundBtn.getComponent(cc.Sprite).spriteFrame = this._btnSpriteUrl
			},
			iconChangeTexture: function(e) {
				this._soundIconSp.getComponent(cc.Sprite).spriteFrame = 1 == e ? this._closeSpriteUrl : this._openSpriteUrl
			},
			refreshSoundTexture: function(e, t) {
				null != this._soundIconSp && (this._soundIconSp.destroy(), this._soundIconSp = null), 1 == t ? this._closeSpriteUrl = e : this._openSpriteUrl = e, this.createBtn(), this.createSoundIcon(), this.iconChangeTexture(t)
			}
		}), cc._RF.pop()
	}, {}],
	GameSoundLoad: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b7992RkOC5CZb6saR1hYMul", "GameSoundLoad"), window.loadSoundDic = new Object, cc.Class({
			properties: {
				url: null,
				playSound: null
			},
			loadEffectSound: function(e) {
				null == loadSoundDic[e] && (loadSoundDic[e] = !0, cc.loader.loadRes(e, cc.AudioClip, function(t, n) {
					null != n && n instanceof cc.AudioClip && engine.gameMemoryManagement.addSoundDic(e, n)
				}))
			},
			loadBackgroundSound: function(e) {
				var t = this;
				this.url = e, null == loadSoundDic[e] && (loadSoundDic[e] = new Object, loadSoundDic[e].loadCount = 1, loadSoundDic[e].isNowLoad = !1), loadSoundDic[e].loadCount >= 5 || 0 == loadSoundDic[e].isNowLoad && (loadSoundDic[e].isNowLoad = !0, loadSoundDic[e].loadCount++, cc.loader.loadRes(e, cc.AudioClip, function(n, a) {
					loadSoundDic[e].isNowLoad = !1, null != a && a instanceof cc.AudioClip && engine.gameMemoryManagement.addSoundDic(e, a), null != t.playSound && (t.playSound(t.url), t.playSound = null)
				}))
			}
		}), cc._RF.pop()
	}, {}],
	GameSound: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1602esvsS9P87wUBdSIkG5V", "GameSound");
		var n = e("GameSoundLoad");
		cc.Class({
			properties: {
				isInit: null,
				soundVolume: null,
				backgroundSoundVolume: null,
				effectSoundVolume: null,
				stopSound: null,
				stopBackgroundSound: null,
				stopEffectSound: null,
				playBackgroundSoundUrl: null,
				lastTimeDic: null,
				loadSoundDic: null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0, this.soundVolume = 1, this.backgroundSoundVolume = 1, this.effectSoundVolume = 1, this.stopBackgroundSound = 0, this.stopEffectSound = 0, this.stopSound = 0, this.playBackgroundSoundUrl = "", this.lastTimeDic = new Object, this.loadSoundDic = new Object)
			},
			stopBackgroundMusic: function() {
				this.stopBackgroundSound = 1, cc.audioEngine.setMusicVolume(0)
			},
			openBackgroundMusic: function() {
				this.stopBackground = 0, cc.audioEngine.setMusicVolume(this.backgroundSoundVolume)
			},
			changeBackgroundMusicState: function() {
				1 == this.stopBackground ? this.openBackgroundMusic() : this.stopBackgroundMusic()
			},
			stopEffectMusic: function() {
				this.stopEffectSound = 1, cc.audioEngine.setEffectsVolume(0)
			},
			openEffectMusic: function() {
				this.stopEffectSound = 0, cc.audioEngine.setEffectsVolume(this.effectSoundVolume)
			},
			changeEffectMusicState: function() {
				1 == this.stopEffect ? this.openEffectMusic() : this.stopEffectMusic()
			},
			stopMusic: function() {
				this.stopSound = 1, this.stopBackgroundMusic(), this.stopEffectMusic()
			},
			openMusic: function() {
				this.stopSound = 0, this.openBackgroundMusic(), this.openEffectMusic()
			},
			playEffect: function(e) {
				var t = engine.gameTime.getLocalTime();
				if (!(null != this.lastTimeDic[e] && t - engineGlobal.playEffectMinTime <= this.lastTimeDic[e])) {
					this.lastTimeDic[e] = t;
					var a = engine.gameMemoryManagement.getSound(e);
					null != a ? cc.audioEngine.playEffect(a) : (new n).loadEffectSound(e)
				}
			},
			playMusic: function(e, t) {
				null == t && (t = !0);
				var a = this;
				this.playMusicUrl = e;
				var i = engine.gameMemoryManagement.getSound(e);
				if (null == i) {
					var o = new n;
					o.playSound = function(e) {
						if (e == a.playMusicUrl) {
							var n = engine.gameMemoryManagement.getSound(e);
							null != n && cc.audioEngine.playMusic(n, t)
						}
					}, o.loadBackgroundSound(e)
				} else cc.audioEngine.playMusic(i, t)
			}
		}), cc._RF.pop()
	}, {
		GameSoundLoad: "GameSoundLoad"
	}],
	GameTime: [function(e, t) {
		"use strict";
		cc._RF.push(t, "aefcbrmJEpPpJRl9bviAflc", "GameTime"), window.timeFormatTypeEm = cc.Enum({
			secondType: 1,
			minuteType: 2,
			hourType: 3,
			dayType: 4
		}), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				localTime: null,
				runTime: null,
				updateCount: null,
				updateManageFun: null
			},
			initialize: function() {
				if (1 != this.isInit) {
					this.isInit = !0;
					var e = new Date;
					this.localTime = e.getTime(), this.updateCount = 0, this.runTime = 0, this.setFrameRate(engineGlobal.gameFrame)
				}
			},
			updateTime: function(e) {
				if (this.runTime = this.runTime + parseInt(1e3 * e), this.localTime = this.localTime + parseInt(1e3 * e), this.updateCount++, this.updateCount > engineGlobal.gameFrame) {
					this.updateCount = 0;
					var t = new Date;
					this.localTime = t.getTime()
				}
				null != this.updateManageFun && this.updateManageFun(this.localTime, e)
			},
			setFrameRate: function(e) {
				this.updateCount = 0, engineGlobal.gameFrame = e, cc.game.setFrameRate(e), this.unschedule(this.updateTime), this.schedule(this.updateTime, 1 / e)
			},
			getLocalTime: function() {
				return this.localTime
			},
			refreshLocal: function() {
				var e = new Date;
				this.localTime = e.getTime()
			},
			formatTime: function(e, t) {
				var n = "";
				if (e <= 0) switch (t) {
					case timeFormatTypeEm.dayType:
						n = "0d 00:00:00";
						break;
					case timeFormatTypeEm.hourType:
						n = "00:00:00";
						break;
					case timeFormatTypeEm.minuteType:
						n = "00:00";
						break;
					case timeFormatTypeEm.secondType:
						n = "00";
						break;
					default:
						n = "00:00:00"
				} else {
					var a = Math.floor(e / 1e3),
						i = "0";
					a > 86400 && (a -= 86400 * (i = Math.floor(a / 3600 / 24)));
					var o = Math.floor(a / 3600);
					o < 10 && (o = "0" + o);
					var s = Math.floor(a % 3600 / 60);
					s < 10 && (s = "0" + s);
					var r = Math.floor(a % 60);
					switch (r < 10 && (r = "0" + r), t) {
						case timeFormatTypeEm.dayType:
							n = i + "d " + o + ":" + s + ":" + r;
							break;
						case timeFormatTypeEm.hourType:
							n = o + ":" + s + ":" + r;
							break;
						case timeFormatTypeEm.minuteType:
							n = s + ":" + r;
							break;
						case timeFormatTypeEm.secondType:
							n = r;
							break;
						default:
							n = o + ":" + s + ":" + r
					}
				}
				return n
			},
			getDayToString: function() {
				var e = new Date;
				return e.getFullYear().toString() + "-" + e.getMonth().toString() + "-" + e.getDate().toString()
			}
		}), cc._RF.pop()
	}, {}],
	GameTool: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6dbaflhTk1P2L33D4FjZtCj", "GameTool"), cc.Class({
			extends: cc.Class,
			properties: {},
			initialize: function() {},
			getRandomInt: function(e, t) {
				return Math.floor(Math.random() * (t - e + 1)) + e
			},
			getRandomFloat: function(e, t) {
				return Math.random() * (t - e) + e
			},
			setGrowthBigTextNum: function(e, t, n, a, i, o, s, r) {
				null == r && (r = ""), e.string = r + t.getNumText(i).toString(), e.nowNum = t;
				var l, c = null,
					h = null;
				1 == n.compareWithNum(t) ? (h = n.getSubNum(t), c = 1) : (h = t.getSubNum(n), c = 0), l = h.getDivide(a), e.updateShow = function() {
					1 == c ? (e.nowNum = e.nowNum.getAddNum(l), 1 == e.nowNum.compareWithNum(n) ? (e.unschedule(e.updateShow), e.nowNum = n, e.string = r + e.nowNum.getNumText(i).toString(), null != o && o(e.nowNum), null != s && s()) : (e.string = r + e.nowNum.getNumText(i).toString(), null != o && o(e.nowNum))) : (e.nowNum = e.nowNum.getSubNum(l), 1 == n.compareWithNum(e.nowNum) ? (e.unschedule(e.updateShow), e.nowNum = n, e.string = r + e.nowNum.getNumText(i).toString(), null != o && o(e.nowNum), null != s && s()) : (e.string = r + e.nowNum.getNumText(i).toString(), null != o && o(e.nowNum)))
				}, e.schedule(e.updateShow, .01)
			},
			setGrowthTextNum: function(e, t, n, a, i, o) {
				null == o && (o = ""), e.string = o + t.toString(), e.nowNum = t;
				var s = parseInt((n - t) / a);
				s > 0 && s < 1 && (s = 1), s < 0 && s > -1 && (s = -1), e.updateShow = function() {
					e.nowNum = e.nowNum + s, (e.nowNum >= n && n > t || e.nowNum <= n && n < t) && (e.unschedule(e.updateShow), e.nowNum = n, null != i && i()), e.string = o + e.nowNum.toString()
				}, e.schedule(e.updateShow, .1)
			},
			rhombusIsContain: function(e, t, n) {
				if (e < n[0].x || e > n[2].x) return !1;
				if (t < n[1].y || t > n[3].y) return !1;
				var a, i;
				return a = t == n[0].y ? n[0].x : t > n[0].y ? (t - n[0].y) / (n[3].y - n[0].y) * (n[3].x - n[0].x) + n[0].x : (n[0].y - t) / (n[0].y - n[1].y) * (n[1].x - n[0].x) + n[0].x, i = t == n[2].y ? n[2].x : t > n[2].y ? n[2].x - (t - n[2].y) / (n[3].y - n[2].y) * (n[2].x - n[3].x) : n[2].x - (n[2].y - t) / (n[2].y - n[1].y) * (n[2].x - n[1].x), e >= a && e <= i
			},
			moveBySpeed: function(e, t, n, a) {
				var i = Math.abs(t.x - e.x),
					o = Math.abs(t.y - e.y),
					s = Math.abs(Math.sqrt(i * i + o * o) / n);
				e.runAction(cc.sequence(cc.moveTo(s, t), cc.callFunc(function() {
					a()
				})))
			},
			getAngle: function(e, t) {
				var n = 0;
				return e.y == t.y ? n = t.x >= e.x ? 0 : 180 : (n = Math.atan((e.x - t.x) / (e.y - t.y)) / Math.PI * 180, e.y < t.y && (e.x < t.x ? n -= 180 : n += 180), n += 90), n
			}
		}), cc._RF.pop()
	}, {}],
	Game: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c4d38ebfW9FYZQtp3mybxZY", "Game"), window.isGameInit = !1, window.isLogin = !1, window.debugTest = {
			setNew: 0,
			setExp: 0,
			veryGold: 0,
			clearBuyInfo: 0,
			stopTackle: 0,
			skipMatching: 0,
			useStartBtnTest: 0,
			setMoreExp: 0,
			setLv: 0,
			setTaskFlushTime: 0,
			finishAllTask: 0,
			autoEnterResult: 0,
			autoEnterFail: 0,
			hideMessageBox: 1,
			unrealResult: 0,
			rankTestLevel: 0,
			testDif: 0,
			resetSkill: 0,
			allowTestBtn: 0,
			lockEnemyDif: 0,
			languageTest: 0,
			arabic_model: 0,
			resetTodaySeeAdsTime: 0,
			resetTodaySeeAdsTime_after_10s: 0,
			shortMulGame: 0,
			cheatMulGameScore: 0,
			noEnemyModel: 0
		}, window.gameInit = function() {
			if (0 == isGameInit) {
				if (gameSDKName == faceBookSDK && (debugTest = {}), isGameInit = !0, initEngine(), initGameSDK(), engineGlobal.gamelanguage = gameSDK.getLocale(), gameSDKName == faceBookSDKTest && debugTest.languageTest && location.search) {
					var e = location.search.substr(1, 1);
					e && (e = ~~e, engineGlobal.gamelanguage = ["English", "Indonisian", "Vietemnese", "Hindi", "Portuguese", "Thai", "Arabic"][e - 1])
				}
				engineGlobal.languageStyle = LanguageStyleType[engineGlobal.gamelanguage], ccLog("\u83b7\u53d6\u56fd\u5bb6\u8bed\u8a00:", engineGlobal.gamelanguage), initRes(), initGame()
			}
		}, cc._RF.pop()
	}, {}],
	GetGemLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "78bb4VtWtlEBbaEtoaF9Eo7", "GetGemLayer"), cc.Class({
			extends: cc.Component,
			properties: {
				closebtn: null,
				watchbtn: null
			},
			onLoad: function() {
				this.closebtn = this.node.getChildByName("closebtn"), this.closebtn.on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this), this.watchbtn = this.node.getChildByName("watchbtn"), this.watchbtn.on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this), this.node.getChildByName("gemnum").getComponent(cc.Label).string = "x" + gameConfigData.watchAD_gem_num, this.node.getChildByName("des").getComponent(cc.Label).string = Util.getLanguage(1010, gameConfigData.watchAD_gem_num)
			},
			onDestroy: function() {
				this.closebtn.off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this), this.watchbtn.off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this), this.isInit = null
			},
			clickCloseBtn: function() {
				this.node.destroy()
			},
			clickWatchBtn: function() {
				var e = this,
					t = videoAdKeyList[~~(Math.random() * videoAdKeyList.length)];
				gameSDK.faceBookAdvertisement.showRewardVideoAd(t, function() {
					MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
						pos: cc.v2(0, 0),
						num: gameConfigData.watchAD_gem_num
					})), e.node.destroy()
				})
			}
		}), cc._RF.pop()
	}, {}],
	HeroData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "eef77H1hfpCF5g1QA1ruu+k", "HeroData"), e("NumBigUnit");
		var n = !1;
		cc.Class({
			extends: cc.Class,
			properties: {
				isInit: null,
				soundOpen: null,
				lv: null,
				exp: null,
				playerSkinInfo: null,
				ballSkinInfo: null,
				playGameNum: null,
				timePlayGameNum: null,
				watchVedioNum: null,
				expWatchVedioNum: null,
				gemWatchVedioNum: null,
				trySkin: null,
				trySkinBall: null,
				vsPlayerInfo: null,
				isOpenRankUp: null,
				rankUpCD: null,
				gold: null,
				gameStartType: null,
				isLevelUp: null,
				otherSkinID: null,
				taskFlushTime: 0,
				haveTaskArr: null,
				taskFinishArr: null,
				taskGetArr: null,
				continueWinTimes: 0,
				skillLevelArr: [0, 0, 0, 0, 0, 0],
				moreGameIndexs: -1,
				rankBuChongNum: 0,
				todaySeeAdsTime: 0
			},
			initialize: function(e) {
				if (1 != this.isInit) {
					this.isInit = !0, debugTest.setNew && (e = null, cc.error("\u9ed1\u79d1\u6280\u5f3a\u5236\u4e3a\u65b0\u53f7")), null == e && (e = new Object), null == e.soundOpen ? this.soundOpen = 1 : this.soundOpen = e.soundOpen, null == e.lv ? this.lv = 1 : this.lv = e.lv, debugTest.setLv && (this.lv = debugTest.setLv), null == e.exp ? this.exp = 0 : this.exp = e.exp, debugTest.setExp && (this.exp = debugTest.setExp), null == e.watchVedioNum ? this.watchVedioNum = 0 : this.watchVedioNum = e.watchVedioNum, null == e.gold ? this.gold = 0 : this.gold = e.gold, debugTest.veryGold && (this.gold = debugTest.veryGold), this.playerSkinInfo = e.playerSkinInfo, null == e.playerSkinInfo && (this.playerSkinInfo = {}, this.playerSkinInfo.select = 1001, this.playerSkinInfo.get = [1001], this.playerSkinInfo.ad = []), this.ballSkinInfo = e.ballSkinInfo, null == e.ballSkinInfo && (this.ballSkinInfo = {}, this.ballSkinInfo.select = 2001, this.ballSkinInfo.get = [2001], this.ballSkinInfo.ad = []), debugTest.clearBuyInfo && (this.playerSkinInfo.select = 1001, this.playerSkinInfo.get = [1001], this.playerSkinInfo.ad = [], this.ballSkinInfo.select = 2001, this.ballSkinInfo.get = [2001], this.ballSkinInfo.ad = []), null == e.playGameNum ? this.playGameNum = 0 : this.playGameNum = e.playGameNum, null == e.timePlayGameNum ? this.timePlayGameNum = 0 : this.timePlayGameNum = e.timePlayGameNum, null == e.isLevelUp ? this.isLevelUp = 0 : this.isLevelUp = e.isLevelUp, null == e.expWatchVedioNum ? this.expWatchVedioNum = 0 : this.expWatchVedioNum = e.expWatchVedioNum, null == e.gemWatchVedioNum ? this.gemWatchVedioNum = 0 : this.gemWatchVedioNum = e.gemWatchVedioNum, debugTest.setTaskFlushTime && (CFG.taskFlushTime = 1e3 * debugTest.setTaskFlushTime), e.taskFlushTime ? this.taskFlushTime = e.taskFlushTime : this.taskFlushTime = (new Date).getTime() + CFG.taskFlushTime, e.haveTaskArr ? this.haveTaskArr = e.haveTaskArr : this.haveTaskArr = [1, 2, 3], e.taskFinishArr ? this.taskFinishArr = e.taskFinishArr : this.taskFinishArr = [], e.taskGetArr ? this.taskGetArr = e.taskGetArr : this.taskGetArr = [], e.continueWinTimes ? this.continueWinTimes = e.continueWinTimes : this.continueWinTimes = 0, debugTest.finishAllTask && (this.taskFinishArr = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]), e.skillLevelArr ? this.skillLevelArr = e.skillLevelArr : this.skillLevelArr = [0, 0, 0, 0, 0, 0], null != e.moreGameIndexs ? this.moreGameIndexs = e.moreGameIndexs : this.moreGameIndexs = -1, e.rankBuChongNum ? this.rankBuChongNum = e.rankBuChongNum : this.rankBuChongNum = 0, debugTest.resetSkill && (this.skillLevelArr = [0, 0, 0, 0, 0, 0]), e.todaySeeAdsTime ? this.todaySeeAdsTime = e.todaySeeAdsTime : this.todaySeeAdsTime = 0;
					var t = new Date;
					t.setHours(0), t.setMinutes(0), t.setSeconds(0), CFG.refresGetAdshTime = 864e5 + t.getTime(), debugTest.resetTodaySeeAdsTime && (this.todaySeeAdsTime = 0), this.isOpenRankUp = !1, this.rankUpCD = Math.floor(2 + 4 * Math.random());
					var a = new Date,
						i = 100 * a.getMonth() + a.getDate();
					null == e.loginDay ? (this.loginDay = i, n = !0) : (this.loginDay = e.loginDay, this.loginDay != i && (this.loginDay = i, n = !0)), this.isRefreshDay(n), this.saveData()
				}
			},
			setData: function() {},
			initBaseData: function(e) {
				null == e && (e = new Object)
			},
			getBaseData: function() {
				var e = new Object;
				return e.soundOpen = this.soundOpen, e.loginDay = this.loginDay, e.lv = this.lv, e.exp = this.exp, e.playerSkinInfo = this.playerSkinInfo, e.ballSkinInfo = this.ballSkinInfo, e.watchVedioNum = this.watchVedioNum, e.gemWatchVedioNum = this.gemWatchVedioNum, e.expWatchVedioNum = this.expWatchVedioNum, e.gold = this.gold, e.isLevelUp = this.isLevelUp, e.playGameNum = this.playGameNum, e.timePlayGameNum = this.timePlayGameNum, e.taskFlushTime = this.taskFlushTime, e.haveTaskArr = this.haveTaskArr, e.taskFinishArr = this.taskFinishArr, e.taskGetArr = this.taskGetArr, e.continueWinTimes = this.continueWinTimes, e.skillLevelArr = this.skillLevelArr, e.moreGameIndexs = this.moreGameIndexs, e.rankBuChongNum = this.rankBuChongNum, e.todaySeeAdsTime = this.todaySeeAdsTime, e
			},
			saveData: function(e) {
				var t = new Object;
				t[fbSaveDataKey[0]] = this.getBaseData(), gameSDK.saveUserData(t, e)
			},
			isRefreshDay: function(e) {
				if (e) {
					this.watchVedioNum = 0, this.gemWatchVedioNum = 0, this.expWatchVedioNum = 0;
					var t = Math.min(this.playGameNum, 15);
					gameSDK.logEventByString("play_count_" + t), this.playGameNum = 0, this.timePlayGameNum = 0, this.todaySeeAdsTime = 0
				}
			},
			resetTrySkin: function() {
				heroData.trySkin = null, heroData.trySkinBall = null
			},
			addWatchVedioNum: function(e) {
				isNaN(e) ? ccLog("\u770b\u89c6\u9891\u8bf7\u4f20\u5165\u6570\u5b57") : (this.watchVedioNum += e, this.saveData())
			},
			getWatchVedioNum: function() {
				return this.watchVedioNum
			},
			addGemWatchVedioNum: function(e) {
				isNaN(e) ? ccLog("\u770b\u89c6\u9891\u8bf7\u4f20\u5165\u6570\u5b57") : (this.gemWatchVedioNum += e, this.saveData())
			},
			getGemWatchVedioNum: function() {
				return this.gemWatchVedioNum
			},
			addExpWatchVedioNum: function(e) {
				isNaN(e) ? ccLog("\u770b\u89c6\u9891\u8bf7\u4f20\u5165\u6570\u5b57") : (this.expWatchVedioNum += e, this.saveData())
			},
			getExpWatchVedioNum: function() {
				return this.expWatchVedioNum
			},
			addGold: function(e) {
				isNaN(e) ? ccLog("\u589e\u52a0\u91d1\u5e01\u8bf7\u4f20\u5165\u6570\u5b57") : (e > 0 && (heroData.taskFinishArr[4] || (heroData.taskFinishArr[4] = 0), heroData.taskFinishArr[4] += e), this.gold += e, this.saveData())
			},
			getGold: function() {
				return this.gold
			},
			getSoundState: function() {
				return this.soundOpen
			},
			closeSound: function() {
				this.soundOpen = 0, this.saveData()
			},
			openSound: function() {
				this.soundOpen = 1, this.saveData()
			},
			setManyExp: function(e) {
				var t = gameConfigData.getLvExpInfo(this.lv).exp;
				this.exp + e >= t ? (this.setLv(++this.lv), this.exp = this.exp + e - t) : this.exp = this.exp + e, this.saveData()
			},
			setExp: function(e) {
				isNaN(e) ? ccLog("\u589e\u52a0\u7ecf\u9a8c\u8bf7\u4f20\u5165\u6570\u5b57") : (this.exp = e, this.saveData())
			},
			getExp: function() {
				return this.exp
			},
			setLv: function(e) {
				isNaN(e) ? ccLog("\u8bbe\u7f6e\u7b49\u7ea7\u8bf7\u4f20\u5165\u6570\u5b57") : (this.lv = e, this.saveData())
			},
			getLv: function() {
				return this.lv < 1 && (this.lv = 1), this.lv
			},
			getTotalExp: function() {
				return this.getLv() >= gameConfigData.lvExpInfo.max ? gameConfigData.lvExpInfo[gameConfigData.lvExpInfo.max].totalexp + this.getExp() : gameConfigData.lvExpInfo[this.getLv()].totalexp + this.getExp()
			},
			getSkinInfo: function(e) {
				var t;
				switch (e) {
					case skinType.SKIN_PELAYER:
						t = this.playerSkinInfo;
						break;
					case skinType.SKIM_BALL:
						t = this.ballSkinInfo
				}
				return t
			},
			flushTask: function() {
				this.taskFlushTime = (new Date).getTime() + CFG.taskFlushTime;
				for (var e = [1, 2, 3, 4, 5, 6, 7], t = [], n = 0; n < e.length; n++) {
					var a = e[n];
					Math.random() > .5 && (a += 10), t.push(a)
				}(t = Util.shuffleArray(t)).length = 3, this.haveTaskArr = t, this.taskFinishArr = [], this.taskGetArr = [], this.saveData()
			},
			anyTaskCanFinish: function() {
				for (var e = !1, t = 0; t < heroData.haveTaskArr.length; t++) {
					var n = heroData.haveTaskArr[t],
						a = gameConfigData.taskData[n];
					(heroData.taskFinishArr[(n - 1) % 10] || 0) >= a.count && -1 == heroData.taskGetArr.indexOf(n) && (e = !0)
				}
				return e
			},
			anySkillCanUpdate: function() {
				for (var e = !1, t = 0; t < 5; t++) {
					var n = heroData.skillLevelArr[t];
					if (n < 10) {
						var a = 100 * (t + 1) + n;
						if (gameConfigData.skillData[a].price <= heroData.getGold()) {
							e = !0;
							break
						}
					}
				}
				return e
			}
		}), cc._RF.pop()
	}, {
		NumBigUnit: "NumBigUnit"
	}],
	HttpSendData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b6617g/ex5FIYHv5ed2SgdI", "HttpSendData"), cc.Class({
			properties: {},
			sendHttp: function(e, t, n) {
				var a = JSON.stringify(t),
					i = ((new Date).getTime(), new XMLHttpRequest);
				i.open("POST", e), i.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), i.callfun = n, i.jsonStr = a, ccLog("jsonStr: " + a), i.url = e, ccLog("url: " + e), i.onreadystatechange = function() {
					if (4 == i.readyState && i.status >= 200 && i.status <= 207) {
						ccLog(".........." + i.responseText);
						var t = JSON.parse(i.responseText);
						ccLog("\u534f\u8bae\u8fd4\u56de\uff1a" + e), ccLog(t), null != i.callfun && i.callfun(t)
					}
				}, i.send(a)
			}
		}), cc._RF.pop()
	}, {}],
	LittleRank: [function(e, t) {
		"use strict";
		cc._RF.push(t, "5f18b5a4zVDsoMgJNgEsS4f", "LittleRank"), cc.Class({
			extends: cc.Component,
			properties: {},
			initialize: function() {
				ccLog("\u5c0f\u6392\u884c\u699c\uff1a", gameConfigData.targetPerson.photo), this.node.getChildByName("nametxt").getComponent(cc.Label).string = gameConfigData.targetPerson.name;
				var e = gameConfigData.createHeadNode(gameConfigData.targetPerson.photo, 52, gameConfigData.targetPerson.type);
				this.node.getChildByName("icon").addChild(e)
			}
		}), cc._RF.pop()
	}, {}],
	LoadControl: [function(e, t) {
		"use strict";
		cc._RF.push(t, "8751dtMMWpHaJpPEowNVVpH", "LoadControl"), window.LoadStyleType = cc.Enum({
			json: 0,
			prefab: 1,
			spriteAtlas: 2,
			spine: 3,
			font: 4,
			particleAsset: 5,
			texture: 6
		}), window.UILoad = function(e, t, a) {
			var i = new n,
				o = new Object;
			o.resources = e, o.analysisFun = a, o.completeCallback = t, i.initialize(o), i.load()
		}, window.loadExternalImage = function(e, t) {
			cc.loader.load(e, function(n, a) {
				null != a && a instanceof cc.Texture2D && (engine.gameMemoryManagement.addExternalImage(e, new cc.SpriteFrame(a)), null != t && t())
			})
		};
		var n = cc.Class({
			properties: {
				isInit: null,
				completeCallback: null,
				analysisFun: null,
				loadBeforeValue: null,
				setLoadPercent: null,
				nameUrlKeyDic: null,
				resources: null,
				mustResources: null,
				resJson: null,
				loadCount: null,
				nowLoadTypeIndex: null,
				loadConnectCount: null
			},
			destroy: function() {
				this.isInit = null, this.completeCallback = null, this.analysisFun = null, this.loadBeforeValue = null, this.setLoadPercent = null, this.nameUrlKeyDic = null, this.resources = null, this.mustResources = null, this.resJson = null, this.loadCount = null, this.mustResources = null, this.nowLoadTypeIndex = null, this.loadConnectCount = null
			},
			initialize: function(e) {
				if (1 != this.isInit) {
					this.isInit = !0, null == e.loadBeforeValue && (this.loadBeforeValue = 0), null == e.mustResources && (e.mustResources = []), this.loadCount = 0, this.nameUrlKeyDic = new Object;
					var t = [
						[],
						[],
						[],
						[],
						[],
						[],
						[]
					];
					this.resJson = [], this.nowLoadTypeIndex = -1, this.loadConnectCount = 0;
					for (var n = 0; n < e.resources.length; n++) {
						var a = e.resources[n].url,
							i = e.resources[n].restype,
							o = a.split("/"),
							s = o[o.length - 1];
						i == LoadStyleType.texture ? this.nameUrlKeyDic[cc.url.raw("resources/" + a)] = a : this.nameUrlKeyDic[s] = a, 0 == engine.gameMemoryManagement.isExistRes(a) && (this.loadCount++, t[i].push(a), i == LoadStyleType.json && this.resJson.push(a))
					}
					this.resources = t, this.mustResources = e.mustResources, this.completeCallback = e.completeCallback, this.analysisFun = e.analysisFun, this.setLoadPercent = e.setLoadPercent
				}
			},
			load: function() {
				if (this.loadConnectCount = this.loadConnectCount + 1, !(this.loadConnectCount > 5))
					if (this.loadCount <= 0) {
						for (var e = 0; e < this.resJson.length; e++) engine.gameMemoryManagement.addJsonDic(this.resJson[e]);
						this.completeLoad()
					} else this.loadResByType()
			},
			checkCompleteLoad: function() {
				var e = [
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				];
				this.nowLoadTypeIndex = -1, this.loadCount = 0;
				for (var t = 0; t < this.mustResources.length; t++) {
					var n = this.mustResources[t].url,
						a = this.mustResources[t].restype,
						i = n.split("/"),
						o = i[i.length - 1];
					this.nameUrlKeyDic[o] = n, 0 == engine.gameMemoryManagement.isExistRes(n) && (this.loadCount++, e[a].push(n))
				}
				this.load()
			},
			getLoadCompleteCount: function() {
				for (var e = 0, t = 0; t <= this.nowLoadTypeIndex - 1; t++) null != this.resources[t] && (e += this.resources[t].length);
				return e
			},
			setLoadPercentFun: function(e, t) {
				if (1 == this.loadConnectCount) {
					var n = this.getLoadCompleteCount() / this.loadCount + e / (this.loadCount * t / this.resources[this.nowLoadTypeIndex].length),
						a = 0 | Math.floor(100 * n);
					n = Math.min(a, 99), null != this.setLoadPercent && this.setLoadPercent(n)
				}
			},
			loadResByType: function() {
				this.nowLoadTypeIndex++;
				var e = this;
				if (this.nowLoadTypeIndex < this.resources.length)
					if (this.resources[this.nowLoadTypeIndex].length > 0) switch (this.nowLoadTypeIndex) {
						case LoadStyleType.json:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t) {
								null != t && ccLog(t.message), e.loadResByType()
							});
							break;
						case LoadStyleType.spriteAtlas:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.SpriteAtlas, function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t, n) {
								null != t && ccLog(t.message);
								for (var a = 0; a < n.length; a++) {
									var i = n[a];
									if (i instanceof cc.SpriteAtlas) {
										var o = i.name.split(".");
										engine.gameMemoryManagement.addSpriteAtlasDic(e.nameUrlKeyDic[o[0]], i)
									}
								}
								e.loadResByType()
							});
							break;
						case LoadStyleType.prefab:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.Prefab, function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t, n) {
								null != t && ccLog(t.message);
								for (var a = 0; a < n.length; a++) {
									var i = n[a];
									i instanceof cc.Prefab && engine.gameMemoryManagement.addPrefabDic(e.nameUrlKeyDic[i.name], i)
								}
								e.loadResByType()
							});
							break;
						case LoadStyleType.spine:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], sp.SkeletonData, function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t, n) {
								null != t && ccLog(t.message);
								for (var a = 0; a < n.length; a++) {
									var i = n[a];
									i instanceof sp.SkeletonData && engine.gameMemoryManagement.addSpine(e.nameUrlKeyDic[i.name], i)
								}
								e.loadResByType()
							});
							break;
						case LoadStyleType.font:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.Font, function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t, n) {
								null != t && ccLog(t.message);
								for (var a = 0; a < n.length; a++) {
									var i = n[a];
									i instanceof cc.Font && engine.gameMemoryManagement.addFont(e.nameUrlKeyDic[i.name], i)
								}
								e.loadResByType()
							});
							break;
						case LoadStyleType.particleAsset:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.ParticleAsset, function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t, n) {
								null != t && ccLog(t.message);
								for (var a = 0; a < n.length; a++) {
									var i = n[a];
									i instanceof cc.ParticleAsset && engine.gameMemoryManagement.addparticleDic(e.nameUrlKeyDic[i.name], i)
								}
								e.loadResByType()
							});
							break;
						case LoadStyleType.texture:
							cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.Texture2D, function(t, n) {
								e.setLoadPercentFun(t, n)
							}, function(t, n) {
								null != t && ccLog(t.message);
								for (var a = 0; a < n.length; a++) {
									var i = n[a];
									if (i instanceof cc.Texture2D) {
										var o = i.url.split(".");
										engine.gameMemoryManagement.addTexture(e.nameUrlKeyDic[o[0]], i)
									}
								}
								e.loadResByType()
							});
							break;
						default:
							ccLog("\u65e0\u6b64\u7c7b\u578b")
					} else this.loadResByType();
					else this.checkCompleteLoad()
			},
			completeLoad: function() {
				null != this.analysisFun && this.analysisFun(), null != this.completeCallback && this.completeCallback(), this.destroy()
			}
		});
		cc._RF.pop()
	}, {}],
	LoginFaceBookSDK: [function(e, t) {
		"use strict";
		cc._RF.push(t, "42921hYZ2xICo06z/1Ol+rb", "LoginFaceBookSDK");
		var n = e("LoadControl"),
			a = e("HeroData");
		cc.Class({
			properties: {
				userData: null
			},
			initialize: function() {
				this.isInit
			},
			login: function() {
				var e = this;
				gameSDK.getPlayInfo(function(t) {
					e.userData = t, heroData = new a, heroData.initialize(t), e.loadRes()
				})
			},
			loadRes: function() {
				var e = new n,
					t = new Object;
				t.resources = gameRes(), t.setLoadPercent = this.setLoadPercent, t.analysisFun = function() {
					engine.gameData.analysisJsonData("language", dataJson.language_json), heroData.setData()
				}, t.completeCallback = function() {
					cc.director.loadScene("MainScene", function() {})
				}, e.initialize(t), e.load()
			},
			setLoadPercent: function(e) {
				gameSDK.setLoadingProgress(e)
			}
		}), cc._RF.pop()
	}, {
		HeroData: "HeroData",
		LoadControl: "LoadControl"
	}],
	LoginSceneControl: [function(e, t) {
		"use strict";
		cc._RF.push(t, "84655pGMuRAc7lK5jojxS+Z", "LoginSceneControl");
		var n = e("LoginFaceBookSDK");
		cc.Class({
			extends: cc.Component,
			properties: {},
			initialize: function() {
				if (gameInit(), 1 != isLogin) {
					ccLog("\u7248\u672c\u53f7\uff1a" + gameVersions);
					var e = new n;
					e.initialize(), e.login(), isLogin = !0
				}
			},
			onEnable: function() {
				this.initialize()
			}
		}), cc._RF.pop()
	}, {
		LoginFaceBookSDK: "LoginFaceBookSDK"
	}],
	MainSceneControl: [function(e, t) {
		"use strict";
		cc._RF.push(t, "98bcfY8YchJFbsPN6ue0w4a", "MainSceneControl"), window.isGetChooseMessage = !0, cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				bgLayer: null,
				mainBuyGemComponent: null,
				openWindowComponent: null
			},
			onDestroy: function() {
				this.openWindowComponent = null, this.mainBuyGemComponent = null
			},
			initialize: function() {
				CFG.currentFightScene = 0, 1 != this.isInit && (this.isInit = !0, MyGameEvent.init(), this.node.addComponent("prefabManager"), this.node.addComponent("viewManager").initEndCall(function() {
					MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.main_view);
					var e = cc.find("big_black_mask").getComponent("black_mask_run");
					e || (e = cc.find("big_black_mask").addComponent("black_mask_run")), e.reset()
				}), gameSDK.leaderboard.setScoreAsync(heroData.getTotalExp()))
			},
			onLoad: function() {
				var e = this;
				gameSDK.startGame(function() {
					e.initialize(), gameSDK.faceBookBot.canSubscribeBotAsync(function() {
						gameSDK.faceBookBot.subscribeBotAsync()
					}), gameSDK.sdkPlayInfo.isNewPlayer || gameSDK.createShortcut()
				})
			}
		}), cc._RF.pop()
	}, {}],
	NumBigUnit: [function(e, t) {
		"use strict";
		cc._RF.push(t, "282daE6RHlF6qZGI4qWHi70", "NumBigUnit");
		var n = cc.Class({
			properties: {
				num: null,
				numUnit: null,
				criticalNum: 9999999
			},
			onDestroy: function() {
				this.num = null, this.numUnit = null
			},
			initialize: function(e) {
				"number" == typeof e && ((t = new Object).numUnit = 0, t.num = e, e = t);
				var t = this.isScientific(e.num);
				this.num = t.num, this.numUnit = t.numUnit + e.numUnit, this.formatNum()
			},
			formatNum: function() {
				if (this.num > this.criticalNum) {
					var e = (t = parseInt(this.num).toString().length) - (n = this.criticalNum.toString().length);
					this.num = this.num / Math.pow(10, e), this.numUnit += e
				} else if (this.numUnit > 0) {
					var t, n;
					this.num < 1 && (this.num = 10 * this.num, this.numUnit = this.numUnit - 1), (t = parseInt(this.num).toString().length) < (n = this.criticalNum.toString().length) && ((e = n - t) > this.numUnit && (e = this.numUnit), this.num = this.num * Math.pow(10, e), this.numUnit -= e)
				}
			},
			isScientific: function(e) {
				var t = new Object,
					n = e.toString(),
					a = n.indexOf("e+"),
					i = n.indexOf("E+");
				return i > a && (a = i), a > -1 ? (t.num = 1e4 * parseFloat(n.substring(0, a)), t.numUnit = parseInt(n.substring(a + 2, n.length)) - 4) : (t.num = e, t.numUnit = 0), t
			},
			getAddNum: function(e) {
				if ("number" == typeof e) {
					var t = new n;
					t.initialize({
						num: e,
						numUnit: 0
					}), e = t
				}
				var a = null,
					i = new Object,
					o = null;
				this.numUnit >= e.numUnit ? (a = this.num, o = this.numUnit, i.num = e.num, i.numUnit = e.numUnit) : this.numUnit < e.numUnit && (a = e.num, o = e.numUnit, i.num = this.num, i.numUnit = this.numUnit);
				var s = o - i.numUnit;
				s > 0 && (i.num = i.num / Math.pow(10, s)), (a += i.num) > this.criticalNum && (a /= 10, o++);
				var r = {
						num: a,
						numUnit: o
					},
					l = new n;
				return l.initialize(r), l
			},
			getSubNum: function(e, t) {
				if ("number" == typeof e) {
					var a = new n;
					a.initialize({
						num: e,
						numUnit: 0
					}), e = a
				}
				if (e.numUnit > this.numUnit && 1 == t) {
					var i = {
						num: 0,
						numUnit: 0
					};
					return (s = new n).initialize(i), s
				}
				var o = new Object;
				o.num = e.num, o.numUnit = e.numUnit;
				var s, r = this.numUnit - o.numUnit;
				return o.num = o.num / Math.pow(10, r), o.num > this.num && 1 == t ? (i = {
					num: 0,
					numUnit: 0
				}, (s = new n).initialize(i), s) : (i = {
					num: this.num - o.num,
					numUnit: this.numUnit
				}, (s = new n).initialize(i), s)
			},
			getMultiplication: function(e) {
				var t = this.num,
					a = this.numUnit;
				"number" == typeof e ? t *= e : (t *= e.num, a += e.numUnit);
				var i = {
						num: t,
						numUnit: a
					},
					o = new n;
				return o.initialize(i), o
			},
			getPercentage: function(e) {
				if ("number" == typeof e) {
					var t = new Object;
					t.numUnit = 0, t.num = e, e = t
				}
				var n = e.num,
					a = e.numUnit,
					i = parseInt(this.num).toString().length + this.numUnit,
					o = parseInt(n).toString().length + a;
				if (i < o - 3) return 0;
				if (i > o + 3) return 100;
				var s = this.num,
					r = this.numUnit,
					l = r;
				return l > a && (l = a), r -= l, s *= Math.pow(10, r), a -= l, 0 == (n *= Math.pow(10, a)) ? (cc.error("\u6ce8\u610f\uff1a\u9664\u6570\u4e3a0\u3002"), 0) : s / n
			},
			getDivide: function(e) {
				if ("number" == typeof e) {
					var t = new n;
					t.initialize({
						num: e,
						numUnit: 0
					}), e = t
				}
				if (0 == e.num) {
					cc.error("\u6ce8\u610f\uff1a\u9664\u6570\u4e3a0\u3002");
					var a = {
						num: 0,
						numUnit: 0
					};
					return (c = new n).initialize(a), c
				}
				var i = this.num,
					o = this.numUnit,
					s = e.num,
					r = e.numUnit,
					l = o;
				if (l > r && (l = r), o -= l, (r -= l) > 100) return a = {
					num: 0,
					numUnit: 0
				}, (c = new n).initialize(a), c;
				s *= Math.pow(10, r);
				var c, h = parseInt(s).toString().length,
					d = parseInt(i).toString().length,
					u = 3;
				return d < h + 3 && (u = u + h + 3 - d), u > o && (u = o), a = {
					num: (i *= Math.pow(10, u)) / s,
					numUnit: o -= u
				}, (c = new n).initialize(a), c
			},
			getNumText: function(e) {
				var t = "k",
					n = 97,
					a = ["m", "b", "t"];
				1 == e && (a = ["M", "B", "T"], t = "K", n = 65);
				var i = "",
					o = parseInt(this.num).toString().length + this.numUnit;
				if (this.num < 1e4) i = parseInt(this.num) < this.num ? this.num.toFixed(2) : this.num.toString();
				else {
					var s = "";
					if (o <= 6) s = t;
					else if (o <= 15) s = a[r = Math.floor((o - 7) / 3)];
					else {
						var r;
						if ((r = Math.floor((o - 16) / 3)) >= 676) {
							var l = Math.floor(r / 676) + n - 1;
							s = String.fromCharCode(l), r %= 676
						}
						var c = Math.floor(r / 26) + n,
							h = r % 26 + n;
						s = s + String.fromCharCode(c) + String.fromCharCode(h)
					}
					var d = this.num,
						u = 3 - this.numUnit % 3;
					for (3 == u && (u = 0), d = parseFloat((d / Math.pow(10, u)).toFixed(2)); d >= 1e3;) d = parseFloat((d / 1e3).toFixed(2));
					i = d.toString() + s
				}
				return i
			},
			getSaveData: function() {
				var e = new Object;
				return e.num = this.num, e.numUnit = this.numUnit, e
			},
			clone: function() {
				var e = new n;
				return e.initialize({
					num: this.num,
					numUnit: this.numUnit
				}), e
			},
			isBiggerZero: function() {
				return this.num > 0
			},
			setZero: function() {
				this.num = 0, this.numUnit = 0
			},
			compareWithNum: function(e) {
				if ("number" == typeof e) {
					var t = new n;
					t.initialize({
						num: e,
						numUnit: 0
					}), e = t
				}
				return this.numUnit > e.numUnit || !(this.numUnit < e.numUnit) && this.num >= e.num
			},
			getNum: function() {
				return this.num * Math.pow(10, this.numUnit)
			},
			getNumFixed: function(e) {
				this.formatNum(), this.num = parseFloat(this.num.toFixed(e))
			},
			getIntNum: function() {
				this.formatNum(), 0 == this.numUnit && (this.num = parseInt(this.num))
			}
		});
		window.getCalculateCritical = function(e) {
			return e > 2 ? 300 : e > 1.5 ? 1e3 : e > 1.2 ? 1700 : e > 1.1 ? 3800 : 7300
		}, window.powerGuardBreak = function(e, t) {
			var a = new n;
			a.initialize({
				num: 1,
				numUnit: 0
			});
			for (var i = getCalculateCritical(e); t > i;) {
				t -= i;
				var o = Math.pow(e, i);
				(new n).initialize({
					num: o,
					numUnit: 0
				}), a = a.getMultiplication(o)
			}
			var s = Math.pow(e, t),
				r = new n;
			return r.initialize({
				num: s,
				numUnit: 0
			}), a.getMultiplication(r)
		}, cc._RF.pop()
	}, {}],
	NumCalculate: [function(e, t) {
		"use strict";
		cc._RF.push(t, "da4f068/1RBy4BAI+Uga7vw", "NumCalculate");
		var n = cc.Class({
			properties: {
				numArr: null
			},
			ctor: function() {
				this.initialize()
			},
			onDestroy: function() {
				this.isInit = null;
				for (var e = this.numArr.length - 1; e >= 0; e--) this.numArr.splice(e, 1);
				this.numArr = null
			},
			initialize: function() {
				1 != this.isInit && (this.isInit = !0)
			},
			addNum: function(e) {
				for (var t = Math.max(this.numArr.length, e.numArr.length), n = 0; n < t; n++) {
					null == this.numArr[n] && (this.numArr[n] = 0), null == e.numArr[n] && (e.numArr[n] = 0), this.numArr[n] = this.numArr[n] + e.numArr[n];
					var a = this.numArr[n] / 1e9;
					if (a > 1) {
						var i = this.numArr[n] % 1e9;
						null == this.numArr[n + 1] && (this.numArr[n + 1] = 0), this.numArr[n + 1] = this.numArr[n + 1] + Math.floor(a), this.numArr[n] = i
					}
				}
				ccLog("\u8ba1\u7b97\u52a0\u6cd5\u503c\uff1a" + this.numArr)
			},
			subNum: function(e) {
				if (this.numArr.length < e.numArr.length) return !1;
				if (this.numArr.length - e.numArr.length < 2)
					for (var t = 0; t < this.numArr.length; t++)
						if (null == e.numArr[t] && (e.numArr[t] = 0), this.numArr[t] >= e.numArr[t]) this.numArr[t] = this.numArr[t] - e.numArr[t];
						else {
							if (null == this.numArr[t + 1]) return !1;
							if (this.numArr[t + 1] > 0) this.numArr[t + 1] = this.numArr[t + 1] - 1, this.numArr[t] = this.numArr[t] + 1e9, this.numArr[t] = this.numArr[t] - e.numArr[t];
							else {
								if (null == this.numArr[t + 2]) return !1;
								this.numArr[t + 2] = this.numArr[t + 2] - 1, this.numArr[t + 1] = this.numArr[t + 1] + 1e9, this.numArr[t + 1] = this.numArr[t + 1] - 1, this.numArr[t] = this.numArr[t] + 1e9, this.numArr[t] = this.numArr[t] - e.numArr[t]
							}
						} ccLog("\u8ba1\u7b97\u52a0\u6cd5\u503c\uff1a" + this.numArr)
			},
			multiplicationNum: function(e) {
				for (var t = [], a = 0; a < this.numArr.length; a++) {
					for (var i = [], o = 0; o < e.numArr.length; o++) {
						for (var s = this.numArr[a] * e.numArr[o], r = 0; r < o; r++) i.push(0);
						i.push(s)
					}
					t.push(i)
				}
				for (this.numArr = [], a = 0; a < t.length; a++) {
					var l = new n;
					l.loadSaveData(t[a]), this.addNum(l)
				}(new n).loadSaveData([]), this.addNum(l)
			},
			getNumText: function() {
				this.deleteHighestNumArr();
				var e = [
						["", "K", "M", "B", "KB", "MB", "TB"],
						["BB"],
						["BBB"]
					][this.numArr.length - 1],
					t = "",
					n = 0;
				if (e.length > 1) {
					var a = 0;
					for (n = (n = this.numArr[0]).toFixed(2); n >= 1e3;) n = (n / 1e3).toFixed(2), a++;
					t = e[a]
				} else {
					t = e[0], n = this.numArr[this.numArr.length - 1];
					var i = this.numArr[this.numArr.length - 2] / 1e9;
					i >= .01 && (n += parseFloat(i.toFixed(2)))
				}
				return n + t
			},
			deleteHighestNumArr: function() {
				return 0 == this.numArr[this.numArr.length - 1] ? (this.numArr.splice(this.numArr.length - 1, 1), this.deleteHighestNumArr(), !1) : (0 == this.numArr.length && this.numArr.push(0), !0)
			},
			getSaveData: function() {
				return this.numArr
			},
			loadSaveData: function(e) {
				this.numArr = e
			}
		});
		cc._RF.pop()
	}, {}],
	OpenVs: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7a71fhm0XlIepTzW0cemFWA", "OpenVs"), window.headType = {
			FRIEND_HEAD: 1,
			BOT_HEAD: 2
		}, cc.Class({
			extends: cc.Component,
			properties: {
				randomTimes: 0,
				randomClothesArr: [],
				randomClothesIndex: 0
			},
			onDestroy: function() {},
			onLoad: function() {
				var e = this.node.getChildByName("info").getChildByName("my"),
					t = this.node.getChildByName("info").getChildByName("other");
				e.getChildByName("clothes").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimg, "j" + (heroData.playerSkinInfo.select - 1e3)), e.getChildByName("name").getComponent(cc.Label).string = gameSDK.sdkPlayInfo.name;
				var n = gameConfigData.getLvExpInfo(heroData.getLv());
				Util.setPic(e.getChildByName("grade"), "uipng/gradeIcon/" + n.name);
				var a = cc.v2(-141, -103);
				e.runAction(cc.sequence(cc.moveTo(.4, a), cc.moveTo(.2, a.add(cc.v2(-20, 20))), cc.moveTo(.15, a), cc.moveTo(.1, a.add(cc.v2(-9, 9))), cc.moveTo(.06, a))), a = cc.v2(40, -240), t.runAction(cc.sequence(cc.moveTo(.4, a), cc.moveTo(.2, a.add(cc.v2(20, -20))), cc.moveTo(.15, a), cc.moveTo(.1, a.add(cc.v2(9, -9))), cc.moveTo(.06, a)));
				var i = this.node.getChildByName("guide");
				i.opacity = 0, i.runAction(cc.sequence(cc.delayTime(.3), cc.fadeTo(.3, 255))), this.node.getChildByName("vs_bomb").runAction(cc.sequence(cc.delayTime(.4), cc.scaleTo(.2, 1.3, 1.3), cc.scaleTo(.15, .9, .9), cc.scaleTo(.1, 1, 1)));
				var o = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012];
				o.splice(o.indexOf(heroData.playerSkinInfo.select), 1), o = Util.shuffleArray(o), this.randomClothesArr = o, this.randomTimes = 40, this.node.getChildByName("guide").getChildByName("readme").getComponent(cc.Label).string = Util.getLanguage(1018)
			},
			showRandomPerson: function(e) {
				var t = this;
				if (debugTest.skipMatching) {
					CFG.fightBot = gameConfigData.getRandomBot(), CFG.randomOtherTeamId = 2, gamePlayCFG.enemyAttrArr = [];
					var n = (s = gameConfigData.playerSkinInfo[1002]).value * (s.valueDir ? 1 : -1);
					return gamePlayCFG.enemyAttrArr[s.attrIndex] = n, void cc.director.loadScene("FightScene", function() {})
				}
				this.randomClothesIndex++, this.randomClothesIndex >= this.randomClothesArr.length && (this.randomClothesIndex = 0);
				var a = gameConfigData.getRandomBot(),
					i = this.randomClothesArr[this.randomClothesIndex],
					o = this.node.getChildByName("info").getChildByName("other");
				if (o.getChildByName("clothes").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimg, "j" + (i - 1e3)), o.getChildByName("name").getComponent(cc.Label).string = a.name, e) {
					var s;
					CFG.fightBot = a, CFG.randomOtherTeamId = i - 1e3, gamePlayCFG.enemyAttrArr = [], n = (s = gameConfigData.playerSkinInfo[i]).value * (s.valueDir ? 1 : -1), gamePlayCFG.enemyAttrArr[s.attrIndex] = n;
					var r = gameConfigData.getLvExpInfo(heroData.getLv());
					this.scheduleOnce(function() {
						t.node.destroy(), cc.director.loadScene("FightScene", function() {})
					}, 2.7), this.scheduleOnce(function() {
						MyGameEvent.emit(MyGameEvent.showBlackMaskRun)
					}, 2.2), this.scheduleOnce(function() {
						var e = t.node.getChildByName("info").getChildByName("other");
						Util.setPic(e.getChildByName("grade"), "uipng/gradeIcon/" + r.name)
					}, .5)
				}
			},
			update: function(e) {
				(n += e) > 1 / (1.5 * this.randomTimes) && (n = 0, this.randomTimes--, this.randomTimes > 0 ? this.showRandomPerson() : (this.showRandomPerson(1), this.update = function() {}))
			}
		});
		var n = 0;
		cc._RF.pop()
	}, {}],
	Resource: [function(e, t) {
		"use strict";
		cc._RF.push(t, "3aab5YIZodLS4Hfy+yvPFeN", "Resource"), window.dataJson = {
			language_json: "Language"
		}, window.mustLoadImage = {
			mustloadimg: "img/mustloadimg/mustloadimg"
		}, window.getLanguageImageRes = function() {
			var e = "language/" + engineGlobal.gamelanguage + "/" + engineGlobal.gamelanguage,
				t = [];
			return t.push({
				url: e,
				restype: LoadStyleType.spriteAtlas
			}), t
		}, window.mustLoadPrefab = {
			msg_view: "prefab/view/prefab_msg_view",
			main_view: "prefab/view/main_view",
			rankPrefab: "prefab/view/rank/rank_view",
			rankItem: "prefab/view/rank/rankItem",
			skinshop_prefab: "prefab/view/shop/skinshop_prefab",
			itemnode_prefab: "prefab/view/shop/itemnode_prefab",
			getgem_prefab: "prefab/view/getgem_prefab",
			uprank_getgem_prefab: "prefab/view/uprank_getgem_prefab",
			vs_prefab: "prefab/view/vs_prefab",
			rankup_prefab: "prefab/view/rankup_prefab",
			task_prefab: "prefab/view/task_prefab",
			tipsnode_prefab: "prefab/view/tipsnode_prefab",
			goal_round_prefab: "prefab/view/goal_round_prefab",
			goal_fail_prefab: "prefab/view/goal_fail_prefab",
			result_prefab: "prefab/view/result_prefab",
			gold_show_add_ui: "prefab/view/gold_show_add_ui",
			loading_ad_prefab: "prefab/view/loading_ad_prefab",
			big_black_mask: "prefab/view/big_black_mask",
			skill_view: "prefab/view/skill/skill_view",
			skill_list: "prefab/view/skill/skill_list",
			ad_certain: "prefab/view/ad_certain_prefab",
			getGoldByADs_many_prefab: "prefab/view/getGoldByADs_many_prefab",
			mul_game_match_prefab: "prefab/view/mul_game/mul_game_match_prefab",
			mul_game_prefab: "prefab/view/mul_game/mul_game_prefab",
			mul_game_personHead: "prefab/view/mul_game/mul_game_personHead",
			mul_game_result_prefab: "prefab/view/mul_game/mul_game_result_prefab",
			mul_game_times_up_prefab: "prefab/view/mul_game/mul_game_times_up_prefab",
			gamemap_prefab: "prefab/gameui/gameMap_prefab",
			small_map_prefab: "prefab/gameui/small_map_prefab",
			gameMap_door_prefab: "prefab/gameui/gameMap_door_prefab",
			player_prefab: "prefab/gameui/player_prefab",
			run_smoke_prefab: "prefab/gameui/run_smoke_prefab",
			kick_effect_prefab: "prefab/gameui/kick_effect_prefab",
			ball_prefab: "prefab/gameui/ball_prefab",
			runCircle_prefab: "prefab/gameui/run_circle_prefab",
			ballOutCamera: "prefab/gameui/ballOutCamera",
			goal_prefab: "prefab/gameui/goal_prefab",
			game_guide: "prefab/gameui/game_guide",
			gold_fly: "prefab/gold_fly"
		}, window.mustLoadSpine = {
			colouredribbon: "spine/endeffect/colouredribbon",
			box: "spine/box/msg_box",
			boxlight: "spine/box/box_light"
		}, window.mustLoadParticle = {
			ram_particle: "particle/ram/ram",
			smoke_particle: "particle/smoke/smoke1"
		}, window.mustLoadFont = {}, window.soundurl = {}, window.loadingSpine = {
			football_spine: "spine/ball/ball"
		}, window.initRes = function() {
			for (var e in dataJson) dataJson[e] = "language/" + dataJson[e]
		}, window.gameRes = function() {
			var e = [];
			for (var t in dataJson) e.push({
				url: dataJson[t],
				restype: LoadStyleType.json
			});
			for (var n in mustLoadFont) e.push({
				url: mustLoadFont[n],
				restype: LoadStyleType.font
			});
			for (var a = getLanguageImageRes(), i = 0; i < a.length; i++) {
				var o = a[i];
				e.push(o)
			}
			for (var s in mustLoadImage) e.push({
				url: mustLoadImage[s],
				restype: LoadStyleType.spriteAtlas
			});
			for (var r in mustLoadPrefab) e.push({
				url: mustLoadPrefab[r],
				restype: LoadStyleType.prefab
			});
			for (var l in mustLoadSpine) e.push({
				url: mustLoadSpine[l],
				restype: LoadStyleType.spine
			});
			for (var c in mustLoadParticle) e.push({
				url: mustLoadParticle[c],
				restype: LoadStyleType.particleAsset
			});
			return e.push({
				url: loadingSpine.football_spine,
				restype: LoadStyleType.spine
			}), cc.log("\u52a0\u8f7d\u8d44\u6e90;", e), e
		}, cc._RF.pop()
	}, {}],
	SkinShopItem: [function(e, t) {
		"use strict";
		cc._RF.push(t, "66091yZNCRKAodu3dau4euY", "SkinShopItem"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null,
				buyBtn: null,
				skinID: null,
				price: 0,
				ad: 0,
				seeAd: 0,
				sp_attrLabel: null,
				sp_priceLabel: null,
				sp_itemImg: null
			},
			onDestroy: function() {
				this.sp_attrLabel.removeFromParent(!0), this.sp_priceLabel.removeFromParent(!0), this.sp_itemImg.removeFromParent(!0), this.sp_attrLabel = null, this.sp_priceLabel = null, this.sp_itemImg = null, this.buyBtn.off(cc.Node.EventType.TOUCH_END, this.clickSelectBtn, this), this.node.off(cc.Node.EventType.TOUCH_END, this.showSkinForTemp, this), this.isInit = null, this.skinID = null
			},
			showSkinForTemp: function() {
				cc.log("\u70b9\u51fb\u4e86", this.skinID), this.skinID < 2e3 ? CFG.tempShowPlayerId = this.skinID : CFG.tempShowBallId = this.skinID, MyGameEvent.emit(MyGameEvent.change_skin)
			},
			initialize: function(e) {
				if (1 != this.isInit)
					if (this.isInit = !0, this.skinID = e, this.buyBtn = this.node.getChildByName("shop_buyed"), this.buyBtn.on(cc.Node.EventType.TOUCH_END, this.clickSelectBtn, this), this.node.on(cc.Node.EventType.TOUCH_END, this.showSkinForTemp, this), this.sp_attrLabel = this.node.getChildByName("attr_label"), this.sp_priceLabel = this.node.getChildByName("shop_buyed").getChildByName("priceLabel"), this.sp_itemImg = this.node.getChildByName("itemimg"), this.skinID < 2e3) {
						this.sp_itemImg.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimg, "j" + (e - 1e3)), this.price = gameConfigData.playerSkinInfo[this.skinID].price, this.ad = gameConfigData.playerSkinInfo[this.skinID].ad, this.seeAd = heroData.playerSkinInfo.ad[this.skinID - 1e3] || 0, heroData.playerSkinInfo.select;
						var t = gameConfigData.playerSkinInfo[this.skinID];
						this.sp_attrLabel.getComponent(cc.Label).string = Util.getLanguage(t.lang_id, t.lang_value)
					} else this.node.getChildByName("attr_bg").active = !1, this.sp_attrLabel.active = !1, this.sp_itemImg.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimg, "ball" + (e - 2e3)), this.price = gameConfigData.ballSkinInfo[this.skinID].price, this.ad = gameConfigData.ballSkinInfo[this.skinID].ad, this.seeAd = heroData.ballSkinInfo.ad[this.skinID - 2e3] || 0
			},
			start: function() {
				var e = this.node.parent.getChildByName("label_content"),
					t = e.convertToNodeSpaceAR(this.sp_attrLabel.convertToWorldSpaceAR(cc.Vec2.ZERO));
				this.sp_attrLabel.position = t, this.sp_attrLabel.parent = this.node.parent.getChildByName("label_content"), t = e.convertToNodeSpaceAR(this.sp_priceLabel.convertToWorldSpaceAR(cc.Vec2.ZERO)), this.sp_priceLabel.position = t, this.sp_priceLabel.parent = this.node.parent.getChildByName("label_content"), t = e.convertToNodeSpaceAR(this.sp_itemImg.convertToWorldSpaceAR(cc.Vec2.ZERO)), this.sp_itemImg.position = t, this.sp_itemImg.parent = this.node.parent.getChildByName("clothes_content"), this.node.parent.getChildByName("clothes_content").zIndex = 990, this.node.parent.getChildByName("label_content").zIndex = 990
			},
			update: function() {
				this.skinID < 2e3 ? (this.node.getChildByName("select").active = CFG.tempShowPlayerId == this.skinID, this.node.getChildByName("inUse").active = heroData.playerSkinInfo.select == this.skinID) : (this.node.getChildByName("select").active = CFG.tempShowBallId == this.skinID, this.node.getChildByName("inUse").active = heroData.ballSkinInfo.select == this.skinID);
				var e = heroData.getSkinInfo(skinType.SKIN_PELAYER),
					t = heroData.getSkinInfo(skinType.SKIM_BALL); - 1 != e.get.concat(t.get).indexOf(this.skinID) ? (this.sp_priceLabel.getComponent(cc.Label).string = Util.getLanguage(1009), this.node.getChildByName("shop_buyed").getChildByName("goldIcon").active = !1, this.node.getChildByName("shop_buyed").getChildByName("watch_icon").active = !1) : (this.node.getChildByName("shop_buyed").getChildByName("goldIcon").active = 0 == this.ad, this.node.getChildByName("shop_buyed").getChildByName("watch_icon").active = 0 != this.ad, 0 == this.ad ? this.sp_priceLabel.getComponent(cc.Label).string = "   " + this.price : this.sp_priceLabel.getComponent(cc.Label).string = "       " + this.seeAd + "/" + this.ad)
			},
			clickSelectBtn: function() {
				var e = this,
					t = heroData.ballSkinInfo.get;
				if (this.skinID < 2e3 && (t = heroData.playerSkinInfo.get), -1 != t.indexOf(this.skinID)) this.skinID < 2e3 ? heroData.playerSkinInfo.select = this.skinID : heroData.ballSkinInfo.select = this.skinID, this.showSkinForTemp(), heroData.saveData();
				else if (this.ad > 0) {
					var n = videoAdKeyList[~~(Math.random() * videoAdKeyList.length)];
					gameSDK.faceBookAdvertisement.showRewardVideoAd(n, function() {
						e.seeAd++, e.skinID < 2e3 ? heroData.playerSkinInfo.ad[e.skinID - 1e3] = heroData.playerSkinInfo.ad[e.skinID - 1e3] ? ++heroData.playerSkinInfo.ad[e.skinID - 1e3] : 1 : heroData.ballSkinInfo.ad[e.skinID - 2e3] = heroData.ballSkinInfo.ad[e.skinID - 2e3] ? ++heroData.ballSkinInfo.ad[e.skinID - 2e3] : 1, e.seeAd == e.ad && (e.skinID < 2e3 ? heroData.playerSkinInfo.get.push(e.skinID) : heroData.ballSkinInfo.get.push(e.skinID), e.clickSelectBtn()), heroData.saveData()
					})
				} else heroData.getGold() >= this.price ? (this.skinID < 2e3 ? heroData.playerSkinInfo.get.push(this.skinID) : heroData.ballSkinInfo.get.push(this.skinID), heroData.addGold(-this.price), this.clickSelectBtn()) : MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.buygem);
				MyGameEvent.emit(MyGameEvent.change_player_skin)
			}
		}), cc._RF.pop()
	}, {}],
	SkinShopLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "70079CAJrRDYYDufW1B2L/u", "SkinShopLayer"), window.skinType = {
			SKIN_PELAYER: 0,
			SKIM_BALL: 1
		}, cc.Class({
			extends: cc.Component,
			properties: {
				returnBtn: null,
				playerSkinBtn: null,
				ballSkinBtn: null,
				moveLayer: null,
				playerItemNodes: null,
				ballItemNodes: null,
				selectSkinType: null,
				selectSkinID: null,
				playerSpineNode: null
			},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.change_skin, this.flushShowPersonAndBall, this), this.returnBtn.off(cc.Node.EventType.TOUCH_END, this.clickReturnFun, this), this.playerSkinBtn.off(cc.Node.EventType.TOUCH_END, this.clickPlayerSkinFun, this), this.ballSkinBtn.off(cc.Node.EventType.TOUCH_END, this.clickBallSkinFun, this), this.returnBtn = null, this.playerSkinBtn = null, this.ballSkinBtn = null, this.moveLayer = null, this.playerItemNodes = null, this.ballItemNodes = null, this.selectSkinType = null, this.selectSkinID = null, this.playerSpineNode = null
			},
			destorySkinNode: function() {
				for (var e = 0; e < this.playerItemNodes.length; e++) this.playerItemNodes[e].destroy();
				for (e = 0; e < this.ballItemNodes.length; e++) this.ballItemNodes[e].destroy();
				this.playerItemNodes = [], this.ballItemNodes = []
			},
			onLoad: function() {
				debugTest.arabic_model && (this.node.getChildByName("returnbtn").x = 270);
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.playerItemNodes = [], this.ballItemNodes = [], this.selectSkinType = skinType.SKIN_PELAYER, this.returnBtn = this.node.getChildByName("returnbtn"), this.playerSkinBtn = this.node.getChildByName("playerbtn"), this.ballSkinBtn = this.node.getChildByName("ballbtn"), this.moveLayer = this.node.getChildByName("contentbg").getChildByName("scv").getComponent(cc.ScrollView).content, this.playerSpineNode = this.node.getChildByName("shopdisplay").getComponent(sp.Skeleton), this.flushShowPersonAndBall(), this.setItemlayer(), MyGameEvent.on(MyGameEvent.change_skin, this.flushShowPersonAndBall, this), this.returnBtn.on(cc.Node.EventType.TOUCH_END, this.clickReturnFun, this), this.playerSkinBtn.on(cc.Node.EventType.TOUCH_END, this.clickPlayerSkinFun, this), this.ballSkinBtn.on(cc.Node.EventType.TOUCH_END, this.clickBallSkinFun, this), this.playerSkinBtn.getChildByName("select").getChildByName("label").getComponent(cc.Label).string = Util.getLanguage(1011), this.playerSkinBtn.getChildByName("unselect").getChildByName("label").getComponent(cc.Label).string = Util.getLanguage(1011), this.ballSkinBtn.getChildByName("select").getChildByName("label").getComponent(cc.Label).string = Util.getLanguage(1012), this.ballSkinBtn.getChildByName("unselect").getChildByName("label").getComponent(cc.Label).string = Util.getLanguage(1012)
			},
			flushShowPersonAndBall: function() {
				this.playerSpineNode.loop = !0, this.playerSpineNode.setSkin(CFG.teamName[CFG.tempShowPlayerId - 1e3]), this.playerSpineNode.timeScale = .5, this.node.getChildByName("ball").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimg, "ball" + (CFG.tempShowBallId - 2e3))
			},
			clickReturnFun: function() {
				this.node.destroy()
			},
			clickPlayerSkinFun: function() {
				this.selectSkinType != skinType.SKIN_PELAYER && (this.selectSkinType = skinType.SKIN_PELAYER, this.setItemlayer())
			},
			clickBallSkinFun: function() {
				this.selectSkinType != skinType.SKIM_BALL && (this.selectSkinType = skinType.SKIM_BALL, this.setItemlayer())
			},
			setItemlayer: function() {
				var e, t = null;
				this.destorySkinNode();
				var n = !1;
				this.selectSkinType == skinType.SKIN_PELAYER ? (t = heroData.getSkinInfo(skinType.SKIN_PELAYER), e = gameConfigData.skinShopInfo[skinType.SKIN_PELAYER]) : (n = !0, t = heroData.getSkinInfo(skinType.SKIM_BALL), e = gameConfigData.skinShopInfo[skinType.SKIM_BALL]), this.playerSkinBtn.getChildByName("select").active = !n, this.playerSkinBtn.getChildByName("unselect").active = n, this.ballSkinBtn.getChildByName("select").active = n, this.ballSkinBtn.getChildByName("unselect").active = !n, this.selectSkinID = t.select;
				var a = Math.ceil(e.length / 3);
				this.node.getChildByName("contentbg").getChildByName("scv").getChildByName("view").getChildByName("content").height = 300 * a + 50;
				for (var i = 0; i < a; i++)
					for (var o = 0; o < 3; o++) {
						var s = 3 * i + o + 1,
							r = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.itemnode_prefab),
							l = r.addComponent("SkinShopItem");
						this.selectSkinType == skinType.SKIN_PELAYER ? (this.playerItemNodes.push(r), l.initialize(s + 1e3)) : (this.ballItemNodes.push(r), l.initialize(s + 2e3)), r.position = cc.v2(230 * o - 230, -140 - 304 * i), this.moveLayer.addChild(r)
					}
			}
		}), cc._RF.pop()
	}, {}],
	TileMapData: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b3cb8DSvCxIy4AJ3v7GLJ3L", "TileMapData"), cc.Class({
			properties: {
				offsetX: null,
				offsetY: null,
				gridWidth: null,
				gridHeight: null,
				gridMaxX: null,
				gridMaxY: null,
				isInit: null,
				gridArr: null,
				defaultGridValue: null,
				gridAngle: 90
			},
			destroy: function() {
				this.offsetX = null, this.offsetY = null, this.gridWidth = null, this.gridHeight = null, this.gridMaxX = null, this.gridMaxY = null, this.isInit = null, this.gridArr = null, this.defaultGridValue = null, this.gridAngle = null
			},
			initialize: function(e) {
				if (1 != this.isInit) {
					this.isInit = !0, null != e.gridAngle && (this.gridAngle = e.gridAngle), this.offsetX = e.offsetX, this.offsetY = e.offsetY, this.gridWidth = e.gridWidth, this.gridHeight = e.gridHeight, this.gridMaxX = e.gridMaxX, this.gridMaxY = e.gridMaxY, this.defaultGridValue = e.defaultGridValue, this.gridArr = [];
					for (var t = 0; t < this.gridMaxX; t++) {
						for (var n = [], a = 0; a < this.gridMaxY; a++) n.push(this.defaultGridValue);
						this.gridArr.push(n)
					}
				}
			},
			setTileMapAttribute: function(e) {
				this.offsetX = e.offsetX, this.offsetY = e.offsetY, this.gridWidth = e.gridWidth, this.gridHeight = e.gridHeight, this.gridMaxX = e.gridMaxX, this.gridMaxY = e.gridMaxY, this.defaultGridValue = e.defaultGridValue, this.gridArr = [];
				for (var t = 0; t < this.gridMaxX; t++) {
					for (var n = [], a = 0; a < this.gridMaxY; a++) n.push(this.defaultGridValue);
					this.gridArr.push(n)
				}
			},
			clearGridInfo: function(e, t) {
				this.setGridInfo(e, t, this.defaultGridValue)
			},
			setGridInfo: function(e, t, n, a) {
				if (null != n) {
					if (n.gridX = e, n.gridY = t, 1 == a) {
						var i = this.getScenePointByGridPoint(e, t);
						n.x = i.x, n.y = i.y
					}
					n.setZIndex()
				}
				return this.gridArr[e][t] = n, i
			},
			getGridInfoByGridPoint: function(e, t) {
				return e < 0 || t < 0 || e >= this.gridMaxX || t >= this.gridMaxY ? null : this.gridArr[e][t]
			},
			getGridInfoByScenePoint: function(e, t) {
				var n = this.getGridPointByScenePoint(e, t);
				return this.getGridInfoByGridPoint(n.x, n.y)
			},
			getGridPointByScenePoint: function(e, t) {
				var n, a;
				return 90 == this.gridAngle ? (n = Math.floor((e - this.offsetX) / this.gridWidth), a = this.gridMaxY - 1 - Math.floor((t - this.offsetY) / this.gridHeight)) : (e = e - this.offsetX + this.gridWidth / 2, t -= this.offsetY, n = Math.floor(e / this.gridWidth - t / this.gridHeight), a = this.gridMaxY - 1 - Math.floor(e / this.gridWidth + t / this.gridHeight)), cc.v2(n, a)
			},
			getScenePointByGridPoint: function(e, t) {
				var n = cc.v2(0, 0);
				return 90 == this.gridAngle ? (n.x = e * this.gridWidth + this.gridWidth / 2, n.y = (this.gridMaxY - 1 - t) * this.gridHeight + this.gridHeight / 2) : (n.x = (e + (this.gridMaxY - 1 - t)) * this.gridWidth / 2, n.y = (this.gridMaxY - 1 - t - e) * this.gridHeight / 2), n.x = n.x + this.offsetX, n.y = n.y + this.offsetY, n
			},
			settingGridByAStar: function() {
				for (var e = 0; e < this.gridArr.length; e++)
					for (var t = 0; t < this.gridArr[e].length; t++) {
						var n = this.gridArr[e][t];
						if (null != n) {
							var a = this.getGridPointByScenePoint(e, t);
							n.x = a.x, n.y = a.y
						}
					}
			}
		}), cc._RF.pop()
	}, {}],
	TipsLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d672e1DqkpDaKTxi+v+cn1B", "TipsLayer"), cc.Class({
			extends: cc.Component,
			properties: {
				isInit: null
			},
			onDestroy: function() {
				this.isInit = null
			},
			destroyNode: function() {
				this.destroyEvent(), this.node.destroy()
			},
			setData: function(e) {
				this.initTxt(e), this.registerEvent()
			},
			initTxt: function(e) {
				this.node.getChildByName("des").getComponent(cc.Label).string = e
			},
			registerEvent: function() {
				this.node.getChildByName("continuebtn").on(cc.Node.EventType.TOUCH_END, this.closeFun.bind(this), this), this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.closeFun.bind(this), this)
			},
			destroyEvent: function() {
				this.node.getChildByName("continuebtn").off(cc.Node.EventType.TOUCH_END, this.closeFun.bind(this), this), this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.closeFun.bind(this), this)
			},
			closeFun: function() {
				this.destroyNode()
			}
		}), cc._RF.pop()
	}, {}],
	ad_certain_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d97ecgwKSJI/7KOFJpsOR3h", "ad_certain_view"), cc.Class({
			extends: cc.Component,
			properties: {
				btn_watch: null,
				btn_cancel: null,
				sucFun: null
			},
			onDestroy: function() {
				this.btn_watch.off(cc.Node.EventType.TOUCH_END, this.clickWatch, this), this.btn_cancel.off(cc.Node.EventType.TOUCH_END, this.clickCancel, this), this.btn_watch = null, this.btn_cancel = null
			},
			start: function() {
				this.btn_watch = this.node.getChildByName("btn_watch"), this.btn_cancel = this.node.getChildByName("btn_cancel"), this.btn_watch.on(cc.Node.EventType.TOUCH_END, this.clickWatch, this), this.btn_cancel.on(cc.Node.EventType.TOUCH_END, this.clickCancel, this)
			},
			setData: function(e) {
				this.sucFun = e
			},
			clickWatch: function() {
				this.sucFun && this.sucFun(), this.node.destroy()
			},
			clickCancel: function() {
				this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	black_mask_run: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7eb54Y8a+VJX5gintWFJn7r", "black_mask_run"), cc.Class({
			extends: cc.Component,
			properties: {},
			reset: function() {
				cc.game.addPersistRootNode(this.node), this.node.opacity = 0, MyGameEvent.on(MyGameEvent.showBlackMaskRun, this.startRun, this)
			},
			startRun: function(e) {
				var t = this;
				MyGameEvent.off(MyGameEvent.showBlackMaskRun, this.startRun, this), this.node.runAction(cc.sequence(cc.fadeTo(.3, 255), cc.callFunc(function() {
					MyGameEvent.emit(MyGameEvent.blackMaskRunEnd), e && e()
				}), cc.delayTime(.5), cc.fadeTo(.3, 0), cc.callFunc(function() {
					cc.game.addPersistRootNode(t.node), MyGameEvent.on(MyGameEvent.showBlackMaskRun, t.startRun, t)
				})))
			}
		}), cc._RF.pop()
	}, {}],
	both_attr: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6c2b5BXZxJIVIwwdMnU1pQ9", "both_attr"), cc.Class({
			extends: cc.Component,
			properties: {
				isEnemy: 1,
				isSelf: 0,
				tackleEndPoint: null,
				ignoreCloseBallTime: 0,
				shootStartTime: 0,
				speed: 0,
				lastDir: cc.v2(0, -1),
				run_force: 0,
				_dir: null,
				tackleTime: 0,
				type: 0,
				lostControl: 0,
				lostControlTime: 0,
				lastPos: null,
				climbUpTime: 0,
				dir: {
					get: function() {
						return this._dir
					},
					set: function(e) {
						this._dir = e, e && (this.lastDir = e)
					}
				}
			},
			onDestroy: function() {
				this.resetAllAttr(), this.unscheduleAllCallbacks()
			},
			start: function() {
				CFG.scheduleManager.pushHitPerson(this)
			},
			resetAllAttr: function() {
				this.node.stopAllActions(), this.tackleEndPoint = null, this.ignoreCloseBallTime = 0, this.speed = 0, this._dir = null, this.run_force = 0, this.lastPos = null
			},
			showTackle: function() {
				var e = this;
				this.tackleTime = (new Date).getTime(), this.getComponent("both_skin").showSkin(playerSkinTypeEm.slide_tackle);
				var t = Util.getCFGValue(gamePlayCFG.tackleDis, this) * this.run_force,
					n = this.node.position,
					a = this.lastDir.normalizeSelf(),
					i = n.add(a.mul(t));
				Math.abs(i.y) > 2e3 && Math.abs(this.node.position.x) < 230 ? (cc.log("\u5e26\u7403\u5165\u95e8"), i = i.clampf(cc.v2(-1200, -2100), cc.v2(1200, 2100))) : i = i.clampf(cc.v2(-1200, -1880), cc.v2(1200, 1880));
				var o = n.sub(i).mag() / 700;
				this.tackleEndPoint = i, i.sub(n).mag(), this.node.runAction(cc.sequence(cc.moveTo(o, i), cc.callFunc(function() {
					e.setPersonStand()
				}))), this.node.getChildByName("slide_effects").active = !0, this.scheduleOnce(function() {
					e.node.getChildByName("slide_effects").active = !1
				}, .85 * o)
			},
			showShoot: function() {
				var e = this;
				(new Date).getTime() - this.shootStartTime < 500 || (this.shootStartTime = (new Date).getTime(), this.getComponent("both_skin").showSkin(playerSkinTypeEm.shoot), CFG.fireStartTime = (new Date).getTime(), this.scheduleOnce(function() {
					MyGameEvent.emit(MyGameEvent.fireball), e.getComponent(CFG.both_attr).ignoreCloseBallTime = (new Date).getTime()
				}, .2))
			},
			showVictory: function() {
				this.setPersonStand(), this.getComponent("both_skin").showSkin(playerSkinTypeEm.victory)
			},
			showBeHit: function(e, t) {
				var n = this,
					a = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_kick_effect, cc.find("Canvas/kick_effects"), this.node.position);
				MyGameEvent.emit(MyGameEvent.createPrefab, a), this.lostControl = 1, this.run_force = 0, this.speed = 0, this.lostControlTime = (new Date).getTime(), this.getComponent("both_skin").showSkin(playerSkinTypeEm.lieflat);
				var i = this.node.position.add(e.normalize().mul(500 * t));
				this.node.runAction(cc.moveTo(.8, i));
				var o = Util.getCFGValue(gamePlayCFG.tackleLostControlTime, this) / 1e3;
				this.scheduleOnce(function() {
					n.getComponent("both_skin").showSkin(playerSkinTypeEm.lie_climb_up), n.climbUpTime = (new Date).getTime()
				}, o - .4), this.scheduleOnce(function() {
					n.setPersonStand(), n.lostControl = 0, n.lostControlTime = 0
				}, o), this.isSelf && (this.dir = null, this.getComponent("playerSpeed").oldDir = null)
			},
			setPersonStand: function() {
				this.dir = null, this.getComponent("npcSpeed") && (this.getComponent("npcSpeed").speed = 0), this.speed = 0, this.lastPos = null, this.run_force = 0, CFG.takeBallPerson == this && (CFG.takeBallPerson = null)
			},
			checkNearBall: function() {
				if (this.lastPos = this.node.position, !CFG.waitForStart && !CFG.showVictory && (!CFG.takeBallPerson || CFG.takeBallPerson && !CFG.takeBallPerson.isEnemy && this.isSelf) && !((new Date).getTime() - this.getComponent(CFG.both_attr).ignoreCloseBallTime < 200)) {
					var e = this.node.position;
					this.lastPos && e.x >= CFG.ballPos.x && this.lastPos.x <= CFG.ballPos.x && (e.x = CFG.ballPos.x), this.lastPos && e.y >= CFG.ballPos.y && this.lastPos.y <= CFG.ballPos.y && (e.y = CFG.ballPos.y), this.node.position.sub(CFG.ballPos).mag() <= 70 && MyGameEvent.emit(MyGameEvent.readyGetBall, this)
				}
			},
			update: function(e) {
				this.speed > 0 && this.dir && (this.run_force += Util.getCFGValue(gamePlayCFG.forceAddSpeed, this) * e / 3), this.run_force = Math.min(this.run_force, 1), (new Date).getTime() - this.lostControlTime > Util.getCFGValue(gamePlayCFG.tackleLostControlTime, this) && (this.lostControl = 0), this.lostControl ? this.isEnemy ? (CFG.allMemberPos["enemy" + this.type] = null, CFG.allMemberSpeed["enemy" + this.type] = 0) : (CFG.allMemberPos["self" + this.type] = null, CFG.allMemberSpeed["self" + this.type] = 0) : this.isEnemy ? (CFG.allMemberPos["enemy" + this.type] = this.node.position, CFG.allMemberSpeed["enemy" + this.type] = this.speed) : (CFG.allMemberPos["self" + this.type] = this.node.position, CFG.allMemberSpeed["self" + this.type] = this.speed), this.isEnemy ? CFG.mapMemberPos["enemy" + this.type] = this.node.position : CFG.mapMemberPos["self" + this.type] = this.node.position
			}
		}), cc._RF.pop()
	}, {}],
	both_skin: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9f097nNb49N5IzAsFNB3Gz5", "both_skin"), window.playerSkinTypeEm = {
			collide: "collide",
			free: "free",
			run: "run",
			shoot: "shoot",
			slide_tackle: "slide_tackle",
			victory: "victory",
			lieflat: "collision",
			lie_climb_up: "climb_up"
		}, cc.Class({
			extends: cc.Component,
			properties: {
				oldSkinName: "",
				showSkinName: ""
			},
			onDestroy: function() {
				this.oldSkinName = "", this.showSkinName = ""
			},
			setTeam: function(e) {
				var t = this.node.getChildByName("spine").getComponent(sp.Skeleton);
				t.setSkin(CFG.teamName[e]), (t = this.node.getChildByName("lieflat").getComponent(sp.Skeleton)).setSkin(CFG.teamName[e])
			},
			showSkin: function(e) {
				if (!CFG.waitForStart && !CFG.showVictory && e != this.oldSkinName) {
					this.showSkinName = e, this.oldSkinName = e;
					var t, n = [playerSkinTypeEm.lieflat, playerSkinTypeEm.lie_climb_up],
						a = this.node.getChildByName("spine"),
						i = this.node.getChildByName("lieflat"); - 1 != n.indexOf(e) ? (a.active = !1, i.active = !0, t = this.node.getChildByName("lieflat").getComponent(sp.Skeleton), e == playerSkinTypeEm.lieflat && this.changePlayerIndex()) : (a.active = !0, i.active = !1, t = this.node.getChildByName("spine").getComponent(sp.Skeleton));
					var o = [playerSkinTypeEm.free, playerSkinTypeEm.run, playerSkinTypeEm.victory];
					t.loop = -1 != o.indexOf(e), t.animation = e, t.timeScale = .5, e == playerSkinTypeEm.slide_tackle && (t.timeScale = .3)
				}
			},
			changePlayerIndex: function() {
				var e = this;
				this.node.zIndex = 9, this.scheduleOnce(function() {
					e.node.zIndex = -1
				}, 1), this.scheduleOnce(function() {
					e.node.zIndex = 0
				}, 2)
			}
		}), cc._RF.pop()
	}, {}],
	close_to_canvas_left_or_right: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cb34ftNTTlM35G292r3qHLk", "close_to_canvas_left_or_right");
		var n = cc.Enum({
				left: 0,
				right: 1
			}),
			a = null;
		cc.Class({
			extends: cc.Component,
			properties: {
				_oldLeftTopP: null,
				_styleType: 0,
				styleType: {
					type: n,
					set: function(e) {
						this._styleType = e
					},
					get: function() {
						return this._styleType
					}
				}
			},
			onLoad: function() {
				if (!(e = cc.find("Canvas/CerTainPosNode"))) {
					var e;
					(e = new cc.Node).name = "CerTainPosNode";
					var t = e.addComponent(cc.Widget);
					t.isAlignLeft = !0, t.left = 0, t.isAlignTop = !0, t.top = 0, cc.find("Canvas").addChild(e)
				}
			},
			update: function() {
				a = cc.find("Canvas/CerTainPosNode").position, null != this._oldLeftTopP && a == this._oldLeftTopP || (this.refreshPos(), this._oldLeftTopP = a)
			},
			refreshPos: function() {
				if (this._styleType == n.left) {
					var e = this.node.parent.convertToNodeSpaceAR(cc.find("Canvas").convertToWorldSpaceAR(a));
					this.node.x = Math.max(-390, e.x)
				}
				this._styleType == n.right && (e = this.node.parent.convertToNodeSpaceAR(cc.find("Canvas").convertToWorldSpaceAR(a.scale(cc.v2(-1, 1)))), this.node.x = Math.min(390, e.x))
			}
		}), cc._RF.pop()
	}, {}],
	fight_black_mask: [function(e, t) {
		"use strict";
		cc._RF.push(t, "829fctw5ZlIoIgwPpvhQ2kO", "fight_black_mask"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function() {
				this.node.position = cc.v2(0, 0), this.node.opacity = 0
			},
			onDestroy: function() {},
			onEnable: function() {
				var e = this;
				cc.tween(this.node).to(.3, {
					opacity: 255
				}).to(.3, {
					opacity: 0
				}).call(function() {
					e.node.destroy()
				}).start()
			}
		}), cc._RF.pop()
	}, {}],
	gameBallOutCamera: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c5df7XCe19N5LEWlakcSoUJ", "gameBallOutCamera"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				this.unscheduleAllCallbacks()
			},
			start: function() {
				this.node.scale = .7, this.node.opacity = 0;
				var e = heroData.getLv();
				e++;
				var t = ~~(((e = Math.min(15, e)) - 1) / 3);
				t = Math.min(4, t), cc.loader.loadRes("uipng/gradeIcon/grade" + e, cc.SpriteFrame, function() {}), cc.loader.loadRes("uipng/gradeIcon/gradebg" + t, cc.SpriteFrame, function() {})
			},
			update: function() {
				if (!CFG.waitForStart) {
					this.node.opacity = 255;
					var e = cc.Camera.findCamera(cc.find("Canvas/ball"));
					if (Math.abs(CFG.ballPos.x - e.node.position.x) > 400 / CFG.s_game_camera_ratio || Math.abs(CFG.ballPos.y - e.node.position.y) > 650 / CFG.s_game_camera_ratio) {
						this.node.opacity = 255;
						var t = e.getWorldToScreenPoint(CFG.ballPos);
						t = t.scale(cc.v2(CFG.s_game_camera_ratio, CFG.s_game_camera_ratio));
						var n = engineGlobal.viewGameWidth - 100,
							a = engineGlobal.viewGameHeigh - 100,
							i = cc.v2(-n >> 1, -a >> 1),
							o = cc.v2(n >> 1, a >> 1),
							s = t.clampf(i, o);
						this.node.position = s
					} else this.node.opacity = 0;
					var r = cc.v2(CFG.allMemberPos.self0).sub(CFG.ballPos),
						l = cc.misc.radiansToDegrees(Math.atan2(r.y, r.x));
					this.node.angle = l + 60
				}
			}
		}), cc._RF.pop()
	}, {}],
	gameBall: [function(e, t) {
		"use strict";
		cc._RF.push(t, "90382pda71HWrW+8XCVt1Sc", "gameBall");
		var n = null,
			a = null,
			i = 0,
			o = 0;
		cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				n = null, a = null, i = 0, o = 0, s = null, r = [1, 1, 1, 1], l = 0, MyGameEvent.off(MyGameEvent.readyGetBall, this.checkWhoGetBall, this), MyGameEvent.off(MyGameEvent.fireball, this.fireBall, this), MyGameEvent.off(MyGameEvent.resetAllPos, this.resetPos, this), this.unscheduleAllCallbacks()
			},
			start: function() {
				this.node.getChildByName("spine").getComponent(sp.Skeleton).animation = CFG.ballName[heroData.ballSkinInfo.select - 2e3], MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_ballOutCamera, cc.find("Canvas/views"))), MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_game_guide, cc.find("Canvas/views"))), MyGameEvent.on(MyGameEvent.readyGetBall, this.checkWhoGetBall, this), MyGameEvent.on(MyGameEvent.fireball, this.fireBall, this), MyGameEvent.on(MyGameEvent.resetAllPos, this.resetPos, this), this.resetPos()
			},
			fireBall: function() {
				if (CFG.takeBallPerson) {
					var e = CFG.takeBallPerson.node,
						t = e.position,
						n = e.getComponent(CFG.both_attr).lastDir,
						o = Util.getCFGValue(gamePlayCFG.shootDis, e) * e.getComponent(CFG.both_attr).run_force;
					if (!n) return;
					e.getComponent(CFG.both_attr).run_force = 0, s = t.add(n.mul(o)), s = cc.v2(s.x, s.y), i = (new Date).getTime(), CFG.takeBallPerson = null, a = this.node.runAction(cc.moveTo(1, s).easing(cc.easeOut(1.45))), r = [1, 1, 1, 1]
				}
			},
			checkWhoGetBall: function(e) {
				CFG.waitForStart || CFG.ballCanTouch && (null != CFG.takeBallPerson && CFG.takeBallPerson != e.getComponent(CFG.both_attr) && (CFG.takeBallPerson.getComponent(CFG.both_attr).ignoreCloseBallTime = (new Date).getTime(), e.getComponent(CFG.both_attr).ignoreCloseBallTime = (new Date).getTime()), CFG.takeBallPerson = e.getComponent(CFG.both_attr), this.node.getChildByName("spine").angle = 90 * -Math.random(), e.getComponent("both_skin").showSkinName == playerSkinTypeEm.slide_tackle && (cc.log("\u8fdb\u5165\u4e86\u94f2\u7403\u7ec8\u70b9\u68c0\u6d4b"), this.showBallBeKick(e)))
			},
			showBallBeKick: function(e) {
				var t = e.getComponent(CFG.both_attr).tackleEndPoint;
				if (cc.log("\u94f2\u7403\u7ed3\u675f\u70b9:", t), CFG.takeBallPerson) {
					var n = CFG.takeBallPerson.node;
					n.getComponent(CFG.both_attr).ignoreCloseBallTime = (new Date).getTime();
					var o = n.position,
						l = t.sub(o).mag(),
						c = 2;
					l < 150 && (c = 4), l < 100 && (c = 6), c *= Util.getCFGValue(gamePlayCFG.tackleBallDis, n), s = o.add(t.sub(o).mul(c)), i = (new Date).getTime(), CFG.takeBallPerson = null, a && a.stop(), a = this.node.runAction(cc.moveTo(.4, s).easing(cc.easeOut(1.45))), r = [1, 1, 1, 1]
				}
			},
			update: function() {
				if (!CFG.waitForStart) {
					switch (l) {
						case 0:
							if ((this.node.position.y > 2e3 || this.node.position.y < -2e3) && this.node.position.x > -230 && this.node.position.x < 230) return cc.log("\u7403\u5165\u95e8\uff0c\u5f97\u5206"), l = 1, CFG.ballCanTouch = 0, void(CFG.takeBallPerson = null);
							if (CFG.takeBallPerson) {
								var e = CFG.takeBallPerson.lastDir;
								if (e) {
									var t = CFG.takeBallPerson.node.position.add(e.mul(65));
									this.node.position = t
								}
							} else this.checkHitWall();
							break;
						case 1:
							this.node.position.y > 0 ? CFG.gameWin = 1 : CFG.gameWin = 0, MyGameEvent.emit(MyGameEvent.stopWaitReset), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.goal_prefab), CFG.showVictory = 1, this.scheduleOnce(function() {
								l = 3
							}, 2), l = 2;
						case 2:
							this.checkHitWallInDoor()
					}
					if (n) {
						var a = this.node.position.sub(n).mag();
						this.node.getChildByName("spine").getComponent(sp.Skeleton).timeScale = a / 20
					}
					CFG.ballPos = this.node.position, n = this.node.position, !CFG.showVictory && (Math.abs(this.node.x) > 1200 || Math.abs(this.node.y) > 1950) && ++o > 10 && (o = 0, this.node.x = cc.misc.clampf(this.node.x, -1150, 1150), this.node.y = cc.misc.clampf(this.node.y, -1900, 1900))
				}
			},
			resetPos: function() {
				var e, t = this,
					n = heroData.lv;
				e = n < 16 ? 3 * (n - 1) + CFG.winTimes + 1 : CFG.winTimes + 46;
				var a = gameConfigData.difficultData[e].difArr;
				CFG.difficult = a[~~(a.length * Math.random())], debugTest.setDifficult && (CFG.difficult = debugTest.setDifficult), debugTest.testDif && (CFG.difficult = 1, cc.error("\u96be\u5ea6\u8c03\u8bd5\u6a21\u5f0f\u9501\u6b7b\u4e3a1")), debugTest.lockEnemyDif && (CFG.difficult = debugTest.lockEnemyDif), cc.log(a, "\u3010\u96be\u5ea6\u8bbe\u5b9a" + CFG.difficult + "\u3011"), this.node.getComponent(cc.MotionStreak).enabled = !1, this.scheduleOnce(function() {
					t.getComponent(cc.MotionStreak).enabled = !0
				}, .2), this.node.position = cc.v2(0, 0), l = 0, CFG.showVictory = 0, CFG.ballCanTouch = 1, CFG.mul_game_count_time = 1, CFG.takeBallPerson = null
			},
			checkHitWall: function() {
				if (s && (this.node.position.x > 1200 || this.node.position.x < -1200)) {
					if (this.node.position.x > 1200) {
						if (!r[3]) return;
						r[3] = 0
					}
					if (this.node.position.x < -1200) {
						if (!r[2]) return;
						r[2] = 0
					}
					a && a.stop();
					var e = cc.v2(this.node.position),
						t = s.sub(e);
					s = e.add(t.scale(cc.v2(-1, 1))), a = this.node.runAction(cc.moveTo(1, s))
				}
				if (0 == l && s && Math.abs(this.node.position.y) > 1950) {
					if (Math.abs(this.node.position.x) <= 230) return cc.log("\u5c04\u95e8\u6210\u529f\uff0c\u5f97\u5206"), void(l = 1);
					if (this.node.position.y > 1950) {
						if (!r[0]) return;
						r[0] = 0
					}
					if (this.node.position.y < -1950) {
						if (!r[1]) return;
						r[1] = 0
					}
					a && a.stop(), e = cc.v2(this.node.position), t = s.sub(e), s = e.add(t.scale(cc.v2(1, -1)));
					var n = 1 - ((new Date).getTime() - i) / 1e3;
					cc.log("\u8bbe\u7f6e\u4e86\u65b0\u7684\u53cd\u5f39:", e, n, s), a = this.node.runAction(cc.moveTo(n, s))
				}
			},
			checkHitWallInDoor: function() {
				if (s && (this.node.position.x > 230 || this.node.position.x < -230)) {
					if (this.node.position.x > 230) {
						if (!r[3]) return;
						r[3] = 0
					}
					if (this.node.position.x < -230) {
						if (!r[2]) return;
						r[2] = 0
					}
					a && a.stop();
					var e = cc.v2(this.node.position),
						t = s.sub(e);
					s = e.add(t.scale(cc.v2(-1, 1))), a = this.node.runAction(cc.moveTo(1, s))
				} else if (s && (this.node.position.y > 2180 || this.node.position.y < -2180)) {
					if (this.node.position.y > 2180) {
						if (!r[0]) return;
						r[0] = 0
					}
					if (this.node.position.y < -2180) {
						if (!r[1]) return;
						r[1] = 0
					}
					a && a.stop(), e = cc.v2(this.node.position), t = s.sub(e), s = e.add(t.scale(cc.v2(1, -1)));
					var n = 1 - ((new Date).getTime() - i) / 1e3;
					a = this.node.runAction(cc.moveTo(n, s))
				}
			}
		});
		var s = null,
			r = [1, 1, 1, 1],
			l = 0;
		cc._RF.pop()
	}, {}],
	gameGuide: [function(e, t) {
		"use strict";
		cc._RF.push(t, "d81d5Epxc1OTLmhLqn7hCz1", "gameGuide"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.removeGuideFinger, this.removeNode, this)
			},
			start: function() {
				this.node.position = cc.v2(0, -300);
				var e = this.node.getChildByName("guide_finger"),
					t = cc.v2(63, -52),
					n = [t, t.add(cc.v2(-70, 70)), t.add(cc.v2(-140, 0)), t.add(cc.v2(-70, -70)), t, t.add(cc.v2(70, 70)), t.add(cc.v2(140, 0)), t.add(cc.v2(70, -70)), t];
				e.runAction(cc.cardinalSplineTo(3, n, 0).repeatForever()), MyGameEvent.on(MyGameEvent.removeGuideFinger, this.removeNode, this)
			},
			removeNode: function() {
				this.node.getChildByName("guide_finger").stopAllActions(), this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	gameMap: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cdce5/lwsVN3b7C8+uSkCsV", "gameMap"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				cc.log("map \u79fb\u9664")
			},
			start: function() {},
			update: function() {}
		}), cc._RF.pop()
	}, {}],
	gameScheduleManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1c3ccoDknRFMJ8GArSCCO8d", "gameScheduleManager");
		var n = [],
			a = [],
			i = 0,
			o = 0;
		cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				n = [], a = [], i = 0, o = 0, this.unscheduleAllCallbacks()
			},
			start: function() {
				CFG.scheduleManager = this
			},
			pushUpdateFun: function(e) {
				n.push(e)
			},
			pushHitPerson: function(e) {
				a.push(e)
			},
			update: function(e) {
				if (n.length > 0) {
					var t = n[i];
					t && t(e)
				}
				if (++i >= n.length && (i = 0), a.length > 0) {
					var s = a[o];
					if (!s.lostControl)
						for (var r = 0; r < a.length; r++)
							if (o != r) {
								var l = a[r];
								if (!s.lostControl && !l.lostControl && l.isEnemy != s.isEnemy) {
									var c = s.node.position,
										h = l.node.position;
									s.speed > 3 && (s.lastPos && (c.x < h.x && s.lastPos.x > h.x || c.x > h.x && s.lastPos.x < h.x) && (c.x = h.x), s.lastPos && (c.y < h.y && s.lastPos.y > h.y || c.y > h.y && s.lastPos.y < h.y) && (c.y = h.y));
									var d = c.sub(h).mag();
									if (!(d > 120))
										if ((new Date).getTime() - l.tackleTime < 500 * l.run_force) s.showBeHit(l.lastDir, l.run_force), CFG.takeBallPerson == s && (CFG.takeBallPerson = null);
										else {
											if (d > 80) continue;
											if (CFG.takeBallPerson == s) {
												CFG.takeBallPerson = null, s.showBeHit(l.lastDir, l.run_force);
												continue
											}
											if (CFG.takeBallPerson == l) {
												CFG.takeBallPerson = null, l.showBeHit(s.lastDir, s.run_force);
												continue
											}
											var u = cc.v2(s.lastDir),
												m = cc.v2(l.lastDir),
												g = u.signAngle(m);
											if (Math.abs(g) < Math.PI / 2) {
												if (s.speed > l.speed) continue;
												s.showBeHit(l.lastDir, l.run_force)
											} else(s.speed > 1 || l.speed > 1) && (s.speed > l.speed ? l.showBeHit(s.lastDir, s.run_force) : s.showBeHit(l.lastDir, l.run_force))
										}
								}
							}
				}++o >= a.length && (o = 0)
			},
			lateUpdate: function() {
				var e = CFG.testPlayerCount ? CFG.testPlayerCount : 9;
				CFG.readyOverNpcNum == e && (CFG.waitForStart = 0, CFG.readyOverNpcNum = 0)
			}
		}), cc._RF.pop()
	}, {}],
	gameSmallMap: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b1fc9n1vCNIkKsNlJkPJBLG", "gameSmallMap"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.mul_game_reset, this.resetMul, this)
			},
			start: function() {
				i = 0, a = 0, debugTest.cheatMulGameScore && (CFG.mul_game_score = [1, 0]), debugTest.shortMulGame && (CFG.mul_game_time = 10);
				var e = cc.find("Canvas/CerTainPosNode").position;
				if (this.node.getChildByName("mul").active = CFG.mul_game_model, CFG.mul_game_model) {
					e = e.add(cc.v2(0, -100));
					var t = gameConfigData.createHeadNode(gameSDK.sdkPlayInfo.photo, 56);
					this.node.getChildByName("mul").getChildByName("self_mask").addChild(t), t = gameConfigData.createHeadNode(CFG.mul_game_bot.photo, 56), this.node.getChildByName("mul").getChildByName("enemy_mask").addChild(t)
				}
				this.node.position = e, MyGameEvent.on(MyGameEvent.mul_game_reset, this.resetMul, this)
			},
			resetMul: function() {
				CFG.mul_game_time = 60, a = 0, i = 0
			},
			flushTimeShowToOverTime: function() {
				a && (this.node.getChildByName("mul").getChildByName("timeLabel").getComponent(cc.Label).string = "Overtime")
			},
			update: function(e) {
				var t = this;
				if ((n += e) > .05) {
					for (var o in n = 0, CFG.mapMemberPos) CFG.mapMemberPos[o] && (this.node.getChildByName("persons").getChildByName(o).position = CFG.mapMemberPos[o].scale(cc.v2(.07, .07)));
					CFG.ballPos && (this.node.getChildByName("persons").getChildByName("smallmap_ball").position = CFG.ballPos.scale(cc.v2(.07, .07))), CFG.mul_game_model && (this.node.getChildByName("mul").getChildByName("scoreLabel").getComponent(cc.Label).string = CFG.mul_game_score[0] + ":" + CFG.mul_game_score[1])
				}
				if (CFG.mul_game_model && CFG.mul_game_count_time && !i) {
					CFG.mul_game_time -= e;
					var s = ~~CFG.mul_game_time;
					s = Math.max(s, 0), a || (this.node.getChildByName("mul").getChildByName("timeLabel").getComponent(cc.Label).string = this.formatTime(s)), (s <= 0 || a) && (i = 1, CFG.mul_game_score[0] != CFG.mul_game_score[1] ? (heroData.taskFinishArr[6] = heroData.taskFinishArr[6] ? ++heroData.taskFinishArr[6] : 1, CFG.showVictory = 1, MyGameEvent.emit(MyGameEvent.stopWaitReset), this.scheduleOnce(function() {
						CFG.mul_game_score[0] > CFG.mul_game_score[1] ? (heroData.setManyExp(10), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_step_win_prefab), MyGameEvent.emit(MyGameEvent.mul_game_reset)) : MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_result_prefab)
					}, 1), a = 0) : a || (a = 1, CFG.showVictory = 1, this.scheduleOnce(function() {
						CFG.mul_game_forever_model = 1, MyGameEvent.emit(MyGameEvent.resetAllPos), t.flushTimeShowToOverTime()
					}, 2.3), this.scheduleOnce(function() {
						MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.black_mask)
					}, 2)))
				}
			},
			formatTime: function(e) {
				var t = parseInt(e);
				return ("00" + parseInt(t % 3600 / 60)).slice(-2) + ":" + ("00" + t % 60).slice(-2)
			}
		});
		var n = 0,
			a = 0,
			i = 0;
		cc._RF.pop()
	}, {}],
	getGoldByADs_many_prefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "eb764ldhgdJvZxugqS6rNzx", "getGoldByADs_many_prefab");
		var n, a, i = [100, 200, 300, 400, 500],
			o = 0;
		cc.Class({
			extends: cc.Component,
			properties: {
				btn1: null,
				btn2: null,
				btn3: null,
				btn4: null,
				btn5: null
			},
			onDestroy: function() {
				n.off(cc.Node.EventType.TOUCH_END, this.showAD, this), a.off(cc.Node.EventType.TOUCH_END, this.closeUI, this), n = null, a = null;
				for (var e = 0; e < 5; e++) this["btn" + (e + 1)].off(cc.Node.EventType.TOUCH_END, this.clickLock, this), this["btn" + (e + 1)] = null
			},
			start: function() {
				(n = this.node.getChildByName("watchbtn")).on(cc.Node.EventType.TOUCH_END, this.showAD, this), (a = this.node.getChildByName("closebtn")).on(cc.Node.EventType.TOUCH_END, this.closeUI, this);
				for (var e = 0; e < 5; e++) this["btn" + (e + 1)] = this.node.getChildByName("show").getChildByName("node" + (e + 1)), this["btn" + (e + 1)].on(cc.Node.EventType.TOUCH_END, this.clickLock, this);
				var t = (new Date).getTime();
				debugTest.resetTodaySeeAdsTime_after_10s && (CFG.refresGetAdshTime = t + 1e4, debugTest.resetTodaySeeAdsTime_after_10s = 0), t > CFG.refresGetAdshTime ? this.resetFlushTime() : this.flushShow()
			},
			resetFlushTime: function() {
				heroData.todaySeeAdsTime = 0;
				var e = new Date;
				e.setHours(0), e.setMinutes(0), e.setSeconds(0), CFG.refresGetAdshTime = 864e5 + e.getTime(), this.flushShow()
			},
			closeUI: function() {
				this.node.destroy()
			},
			clickLock: function(e) {
				~~e.target.name.slice(-1) - 1 == heroData.todaySeeAdsTime && this.showAD()
			},
			showAD: function() {
				var e = this;
				if (!(heroData.todaySeeAdsTime > 4)) {
					var t = i[heroData.todaySeeAdsTime],
						n = videoAdKeyList[~~(Math.random() * videoAdKeyList.length)];
					gameSDK.faceBookAdvertisement.showRewardVideoAd(n, function() {
						MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
							pos: cc.v2(-50, 118 * heroData.todaySeeAdsTime - 173),
							num: t
						})), heroData.todaySeeAdsTime++, e.flushShow()
					})
				}
			},
			flushShow: function() {
				for (var e = 0; e < 5; e++) {
					var t = this.node.getChildByName("show").getChildByName("node" + (e + 1));
					t.getChildByName("numLabel").getComponent(cc.Label).string = i[e], e == heroData.todaySeeAdsTime ? (Util.setPic(t.getChildByName("ads_gold_lock"), "uipng/moreGoldAds/ads_gold_play"), Util.setPic(t.getChildByName("ads_gold_bg"), "scaleimg/ads_gold_bg"), t.getChildByName("numLabel").color = cc.color().fromHEX("#ffffff")) : Util.setPic(t.getChildByName("ads_gold_bg"), "scaleimg/task_bg");
					var n = t.getChildByName("ads_gold").getComponent(cc.Sprite);
					e < heroData.todaySeeAdsTime && (Util.setPic(t.getChildByName("ads_gold_lock"), "uipng/moreGoldAds/ads_gold_gou"), t.getChildByName("numLabel").color = cc.color().fromHEX("#6dd401")), e > heroData.todaySeeAdsTime && (Util.setPic(t.getChildByName("ads_gold_lock"), "uipng/moreGoldAds/ads_gold_lock"), t.getChildByName("numLabel").color = cc.color().fromHEX("#d0d0d0")), e <= heroData.todaySeeAdsTime ? n.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-sprite", n)) : n.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", n))
				}
			},
			update: function(e) {
				var t = (new Date).getTime();
				(o += e) > .1 && (o = 0, this.node.getChildByName("time_des").getComponent(cc.Label).string = "Resets in: " + Util.formatTime(CFG.refresGetAdshTime - t), CFG.refresGetAdshTime - t < 0 && this.resetFlushTime(), n.getComponent(cc.Button).interactable = heroData.todaySeeAdsTime <= 4)
			}
		}), cc._RF.pop()
	}, {}],
	goal_fail_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "48a9c8ADgpPMLon8M2AvSgd", "goal_fail_view"), cc.Class({
			extends: cc.Component,
			properties: {
				rematchBtn: null,
				skillBtn: null
			},
			onDestroy: function() {
				this.rematchBtn.off(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this), this.rematchBtn = null, this.continueBtn.off(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this), this.continueBtn = null, this.skillBtn.stopAllActions(), this.skillBtn.off(cc.Node.EventType.TOUCH_END, this.clickSkillBtn, this), this.skillBtn = null
			},
			start: function() {
				gameSDK.faceBookAdvertisement.showInterstitialAD(1), this.rematchBtn = this.node.getChildByName("rematchBtn"), this.rematchBtn.on(cc.Node.EventType.TOUCH_END, this.clickRematchBtn, this), this.continueBtn = this.node.getChildByName("continueBtn"), this.continueBtn.on(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this), this.skillBtn = this.node.getChildByName("skillBtn"), this.skillBtn.on(cc.Node.EventType.TOUCH_END, this.clickSkillBtn, this), this.skillBtn.runAction(cc.sequence(cc.scaleTo(.3, 1.2, 1.3), cc.scaleTo(.2, .9, .9), cc.scaleTo(.1, 1, 1), cc.delayTime(.3)).repeatForever())
			},
			clickSkillBtn: function() {
				this.node.destroy(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.skill)
			},
			clickRematchBtn: function() {
				var e = this;
				cc.log("\u770b\u5e7f\u544a\u91cd\u65b0\u6bd4\u8d5b");
				var t = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
				gameSDK.faceBookAdvertisement.showRewardVideoAd(t, function() {
					MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.black_mask), e.scheduleOnce(function() {
						e.node.destroy(), MyGameEvent.emit(MyGameEvent.resetAllPos)
					}, .3)
				})
			},
			clickContinueBtn: function() {
				CFG.winTimes -= 1, CFG.winTimes = Math.max(0, CFG.winTimes), this.node.destroy(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.goal_round)
			}
		}), cc._RF.pop()
	}, {}],
	goal_round_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "612f01U6hNHz49pE7Z4cxm6", "goal_round_view"), cc.Class({
			extends: cc.Component,
			properties: {
				nextBtn: null,
				backBtn: null
			},
			onDestroy: function() {
				this.nextBtn.off(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this), this.nextBtn = null, this.backBtn.off(cc.Node.EventType.TOUCH_END, this.clickBackBtn, this), this.backBtn = null
			},
			onLoad: function() {
				debugTest.unrealResult && (CFG.winTimes = 1, CFG.gameWin = 0);
				var e = CFG.winTimes - CFG.gameWin;
				if (CFG.gameWin) switch (e) {
					case 0:
						Util.setPic(this.node.getChildByName("round1"), "uipng/goal/enter_yellow"), Util.setPic(this.node.getChildByName("round2"), "uipng/goal/enter_yellow");
						break;
					case 1:
						Util.setPic(this.node.getChildByName("round1"), "uipng/goal/enter_blue"), this.node.getChildByName("round1").getChildByName("gou").active = !0, Util.setPic(this.node.getChildByName("round2"), "uipng/goal/enter_yellow");
						break;
					case 2:
						Util.setPic(this.node.getChildByName("round1"), "uipng/goal/enter_blue"), this.node.getChildByName("round1").getChildByName("gou").active = !0, Util.setPic(this.node.getChildByName("round2"), "uipng/goal/enter_blue")
				} else switch (e = CFG.winTimes + 1) {
					case 1:
						Util.setPic(this.node.getChildByName("round1"), "uipng/goal/enter_blue"), Util.setPic(this.node.getChildByName("round2"), "uipng/goal/enter_yellow");
						break;
					case 2:
						Util.setPic(this.node.getChildByName("round1"), "uipng/goal/enter_blue")
				}
				this.node.getChildByName("round1").getChildByName("round_label").getComponent(cc.Label).string = Util.getLanguage(1008, 1), this.node.getChildByName("round2").getChildByName("round_label").getComponent(cc.Label).string = Util.getLanguage(1008, 2), this.node.getChildByName("enter_bigblue").getChildByName("title_label").getComponent(cc.Label).string = Util.getLanguage(1007)
			},
			start: function() {
				this.nextBtn = this.node.getChildByName("nextBtn"), this.nextBtn.on(cc.Node.EventType.TOUCH_END, this.clickNextBtn, this), this.backBtn = this.node.getChildByName("returnbtn"), this.backBtn.on(cc.Node.EventType.TOUCH_END, this.clickBackBtn, this), gameSDK.faceBookAdvertisement.showInterstitialAD(2, this.showEffect.bind(this), this.showEffect.bind(this));
				var e = new cc.Node;
				e.scale = .8, e.setPosition(0, 0), this.node.addChild(e)
			},
			showEffect: function() {
				var e = this;
				if (this.node) {
					var t = [-194, 3, 222];
					CFG.gameWin > 0 ? this.node.getChildByName("enter_foot").runAction(cc.sequence(cc.moveTo(.5, cc.v2(0, t[CFG.winTimes - 1])), cc.callFunc(function() {
						e.showGouCha()
					}), cc.moveBy(.3, cc.v2(-255, 220)))) : this.node.getChildByName("enter_foot").runAction(cc.sequence(cc.callFunc(function() {
						e.showGouCha()
					}), cc.delayTime(.3), cc.moveTo(.5, cc.v2(-255, t[CFG.winTimes]))))
				}
			},
			showGouCha: function() {
				CFG.gameWin ? this.showPaziEffect(CFG.winTimes, 1) : this.showPaziEffect(CFG.winTimes + 1, 0)
			},
			showPaziEffect: function(e, t) {
				var n = this;
				t ? (Util.setPic(this.node.getChildByName("round" + e), "uipng/goal/enter_blue"), this.node.getChildByName("round" + e).getChildByName("gou").active = !0, this.node.getChildByName("round" + e).runAction(cc.sequence(cc.scaleTo(.2, 1.3, 1.3), cc.scaleTo(.12, .9, .9), cc.scaleTo(.08, 1.1, 1.1), cc.scaleTo(.04, 1, 1)))) : this.node.getChildByName("round" + e).runAction(cc.sequence(cc.delayTime(.3), cc.scaleTo(.3, 1, 0), cc.callFunc(function() {
					Util.setPic(n.node.getChildByName("round" + e), "uipng/goal/enter_yellow"), n.node.getChildByName("round" + e).getChildByName("cha").active = !0
				}), cc.scaleTo(.12, 1, 1)))
			},
			clickNextBtn: function() {
				var e = this;
				cc.log("\u4e0b\u4e00\u573a\u6bd4\u8d5b"), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.black_mask), this.scheduleOnce(function() {
					e.node.destroy(), MyGameEvent.emit(MyGameEvent.resetAllPos)
				}, .3)
			},
			clickBackBtn: function() {
				CFG.gameWin = 0, this.node.destroy(), cc.director.loadScene("MainScene", function() {
					CFG.reset()
				})
			}
		}), cc._RF.pop()
	}, {}],
	goal_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e22c40icztGFp4c/9m7YwJ3", "goal_view"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function() {
				var e = this;
				heroData.taskFinishArr[0] = heroData.taskFinishArr[0] ? ++heroData.taskFinishArr[0] : 1, this.node.getChildByName("enter_goal").runAction(cc.sequence(cc.scaleTo(.3, 1.4), cc.scaleTo(.2, .94), cc.scaleTo(.1, 1.2), cc.sequence(cc.delayTime(.3), cc.scaleTo(.3, 1.4), cc.scaleTo(.2, .94), cc.scaleTo(.1, 1.2)).repeatForever())), this.node.getChildByName("yanhua1").getComponent(sp.Skeleton).animation = "float", this.node.getChildByName("yanhua2").getComponent(sp.Skeleton).animation = "float", CFG.mul_game_count_time = 0, CFG.mul_game_model ? CFG.mul_game_forever_model ? (CFG.mul_game_forever_model = 0, CFG.mul_game_time = 60, CFG.gameWin ? (CFG.mul_game_score[0]++, heroData.setManyExp(10), CFG.continueWinTimesWithAttr++, this.scheduleOnce(function() {
					MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_step_win_prefab), MyGameEvent.emit(MyGameEvent.mul_game_reset)
				}, 2)) : (CFG.mul_game_score[1]++, CFG.continueWinTimesWithAttr -= 1, CFG.continueWinTimesWithAttr <= 0 && (CFG.continueWinTimesWithAttr = 0), this.scheduleOnce(function() {
					MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_result_prefab), MyGameEvent.emit(MyGameEvent.mul_game_reset)
				}, 2))) : (CFG.gameWin ? (CFG.mul_game_score[0]++, CFG.continueWinTimesWithAttr++) : (CFG.mul_game_score[1]++, CFG.continueWinTimesWithAttr -= 1, CFG.continueWinTimesWithAttr <= 0 && (CFG.continueWinTimesWithAttr = 0)), gamePlayCFG.flushContinueWinAttr(), this.scheduleOnce(function() {
					e.node.destroy(), MyGameEvent.emit(MyGameEvent.resetAllPos)
				}, 2.3), this.scheduleOnce(function() {
					MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.black_mask)
				}, 2)) : this.scheduleOnce(function() {
					var t;
					e.node.destroy(), CFG.gameWin ? (heroData.taskFinishArr[1] = heroData.taskFinishArr[1] ? ++heroData.taskFinishArr[1] : 1, heroData.taskFinishArr[2] = heroData.taskFinishArr[2] ? ++heroData.taskFinishArr[2] : 1, heroData.taskFinishArr[3] = heroData.taskFinishArr[3] ? ++heroData.taskFinishArr[3] : 1, CFG.winTimes += 1, heroData.continueWinTimes++, CFG.continueWinTimesWithAttr++, CFG.continueFailTimes = 0, gamePlayCFG.flushContinueWinAttr(), t = CFG.winTimes < 3 ? GameViewConfig.goal_round : GameViewConfig.rankUp) : (heroData.taskFinishArr[3] = 0, heroData.continueWinTimes = 0, CFG.continueFailTimes++, CFG.continueWinTimesWithAttr -= 2, CFG.continueWinTimesWithAttr <= 3 && (CFG.continueWinTimesWithAttr = 0), gamePlayCFG.flushContinueWinAttr(), t = GameViewConfig.goal_fail), debugTest.autoEnterResult && (t = GameViewConfig.rankUp), debugTest.autoEnterFail && (t = GameViewConfig.goal_fail), MyGameEvent.emit(MyGameEvent.openView, t)
				}, 2)
			}
		}), cc._RF.pop()
	}, {}],
	gold_fly: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9cd26NnNNVOUK5AxxZKBg46", "gold_fly"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function() {},
			setData: function(e) {
				var t = this;
				this.node.position = e.pos;
				var n = cc.v2(-230, 587);
				debugTest.arabic_model && (n = cc.v2(-30, 587)), this.node.runAction(cc.sequence(cc.bezierTo(.7, [e.pos, cc.v2(720 * (.5 - Math.random()), 300), n]), cc.callFunc(function() {
					t.node.destroy(), heroData.addGold(e.num)
				})))
			}
		}), cc._RF.pop()
	}, {}],
	gold_show_add_ui: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c6d4022fEVKD7myA8yQWhGP", "gold_show_add_ui"), cc.Class({
			extends: cc.Component,
			properties: {
				getGemBtn: null
			},
			onLoad: function() {
				debugTest.arabic_model && (this.node.x += 200)
			},
			onDestroy: function() {
				this.getGemBtn.off(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this), this.getGemBtn = null, MyGameEvent.off(MyGameEvent.blackMaskRunEnd, this.destroyNode, this)
			},
			start: function() {
				this.getGemBtn = this.node.getChildByName("getbtn"), this.getGemBtn.on(cc.Node.EventType.TOUCH_END, this.clickGetBtn, this), MyGameEvent.on(MyGameEvent.blackMaskRunEnd, this.destroyNode, this)
			},
			destroyNode: function() {
				this.node.destroy()
			},
			clickGetBtn: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.buygem)
			},
			update: function() {
				this.node.getChildByName("gemtxt").getComponent(cc.Label).string = heroData.getGold() + ""
			}
		}), cc._RF.pop()
	}, {}],
	kickEffect: [function(e, t) {
		"use strict";
		cc._RF.push(t, "69989xgITBGRI8ilZ5+Ra6/", "kickEffect"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {},
			start: function() {},
			setData: function(e) {
				this.node.position = e
			}
		}), cc._RF.pop()
	}, {}],
	loading_ad_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a6febhvH3NJXq3a2pbxZAh+", "loading_ad_view"), cc.Class({
			extends: cc.Component,
			properties: {
				circle: null
			},
			onLoad: function() {
				this.circle = this.node.getChildByName("circle"), this.circle.runAction(cc.rotateBy(.8, -360).repeatForever()), MyGameEvent.on(MyGameEvent.removeAdLoading, this.removeHandle, this), CFG.needSoonRemoveLoadingCircle && this.removeHandle()
			},
			onDestroy: function() {
				CFG.needSoonRemoveLoadingCircle = !1, this.circle.stopAllActions(), this.circle = null, MyGameEvent.off(MyGameEvent.removeAdLoading, this.removeHandle, this)
			},
			removeHandle: function() {
				this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	main_view: [function(require, module, exports) {
		"use strict";
		var _properties;
		cc._RF.push(module, "cf478yN5NBH64YT+TDEQog3", "main_view"), cc.Class({
			extends: cc.Component,
			properties: (_properties = {
				soundBtn: null,
				isInit: null,
				progressBar: null,
				spineArray: null,
				gamePlayPool: null
			}, _properties.isInit = null, _properties.startBtn = null, _properties.shopBtn = null, _properties.rankBtn = null, _properties.taskBtn = null, _properties.skillBtn = null, _properties.playerSpineNode = null, _properties.debugBtn = null, _properties.testBtn = null, _properties.moreGameBtn = null, _properties.mulgamebtn = null, _properties.freegoldBtn = null, _properties),
			onDestroy: function() {
				this.soundBtn.off(cc.Node.EventType.TOUCH_END, this.soundbtnFun, this), this.soundBtn = null, MyGameEvent.off(MyGameEvent.change_player_skin, this.changeSkin, this), MyGameEvent.off(MyGameEvent.blackMaskRunEnd, this.destroyNode, this), this.isInit = null, this.progressBar = null, this.spineArray = null, this.startBtn.off(cc.Node.EventType.TOUCH_END, this.clickStartBtn, this), this.shopBtn.off(cc.Node.EventType.TOUCH_END, this.clickSkinShopBtn, this), this.rankBtn.off(cc.Node.EventType.TOUCH_END, this.clickRankBtn, this), this.taskBtn.off(cc.Node.EventType.TOUCH_END, this.clickTaskBtn, this), this.skillBtn.off(cc.Node.EventType.TOUCH_END, this.clickTaskBtn, this), this.testBtn.off(cc.Node.EventType.TOUCH_END, this.clicTestBtn, this), this.mulgamebtn.off(cc.Node.EventType.TOUCH_END, this.clickMulGameBtn, this), this.freegoldBtn.off(cc.Node.EventType.TOUCH_END, this.clickFreeGoldBtn, this), this.isInit = null, this.startBtn = null, this.shopBtn = null, this.rankBtn = null, this.taskBtn = null, this.skillBtn = null, this.testBtn = null, this.moreGameBtn = null, this.mulgamebtn = null, this.freegoldBtn = null, debugTest.testDif && this.debugBtn.off(cc.Node.EventType.TOUCH_END, this.setEditBoxHandle, this)
			},
			onLoad: function() {
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.soundBtn = this.node.getChildByName("soundbtn"), this.refreshSoundState(), MyGameEvent.on(MyGameEvent.change_player_skin, this.changeSkin, this), MyGameEvent.on(MyGameEvent.blackMaskRunEnd, this.destroyNode, this), this.progressBar = this.node.getChildByName("progressbg"), this.startBtn = this.node.getChildByName("startbtn"), this.shopBtn = this.node.getChildByName("shopbtn"), this.rankBtn = this.node.getChildByName("rankbtn"), this.taskBtn = this.node.getChildByName("main_task"), this.skillBtn = this.node.getChildByName("skillbtn"), this.mulgamebtn = this.node.getChildByName("mulgamebtn"), this.freegoldBtn = this.node.getChildByName("freegoldbtn"), this.playerSpineNode = this.node.getChildByName("shopdisplay").getComponent(sp.Skeleton), this.soundBtn.on(cc.Node.EventType.TOUCH_END, this.soundbtnFun, this), this.startBtn.on(cc.Node.EventType.TOUCH_END, this.clickStartBtn, this), this.shopBtn.on(cc.Node.EventType.TOUCH_END, this.clickSkinShopBtn, this), this.rankBtn.active = 0, this.rankBtn.on(cc.Node.EventType.TOUCH_END, this.clickRankBtn, this), this.taskBtn.on(cc.Node.EventType.TOUCH_END, this.clickTaskBtn, this), this.skillBtn.on(cc.Node.EventType.TOUCH_END, this.clickSkillBtn, this), this.mulgamebtn.on(cc.Node.EventType.TOUCH_END, this.clickMulGameBtn, this), this.freegoldBtn.on(cc.Node.EventType.TOUCH_END, this.clickFreeGoldBtn, this), this.testBtn = this.node.getChildByName("main_pass"), this.testBtn.on(cc.Node.EventType.TOUCH_END, this.clicTestBtn, this), CFG.tempShowPlayerId = heroData.getSkinInfo(skinType.SKIN_PELAYER).select, CFG.tempShowBallId = heroData.getSkinInfo(skinType.SKIM_BALL).select, this.changeSkin(), this.initData(), debugTest.testDif && (this.node.getChildByName("debugPanel").active = !0, this.debugBtn = this.node.getChildByName("debugPanel").getChildByName("runBtn"), this.debugBtn.on(cc.Node.EventType.TOUCH_END, this.setEditBoxHandle, this))
			},
			setEditBoxHandle: function setEditBoxHandle() {
				var txt = this.node.getChildByName("debugPanel").getChildByName("editBox").getComponent(cc.EditBox).string;
				txt = "({" + txt + "})";
				var ob = eval(txt);
				for (var index in ob) cc.log("index", index), gamePlayCFG[index] = ob[index];
				var printArr = ["enemyAttr1_f", "enemyAttr1_b", "enemyAttr1_d", "friendAttr1_f", "friendAttr1_b", "friendAttr1_d", "selfAttr1"];
				cc.log("\u8bbe\u7f6e\u5b8c\u6210----------------------------------------------------------------");
				for (var i = 0; i < printArr.length; i++) console.log(printArr[i], gamePlayCFG[printArr[i]])
			},
			changeSkin: function() {
				var e = heroData.playerSkinInfo.select,
					t = heroData.ballSkinInfo.select;
				this.playerSpineNode.loop = !0, this.playerSpineNode.setSkin(CFG.teamName[e - 1e3]), this.playerSpineNode.timeScale = .5, this.node.getChildByName("showball").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mustloadimg, "ball" + (t - 2e3))
			},
			refreshSoundState: function() {
				1 == heroData.getSoundState() ? (ccLog("\u5f00\u542f\u97f3\u4e50"), engine.gameSound.openMusic(), engine.gameSound.openBackgroundMusic(), engine.gameSound.openEffectMusic(), this.soundBtn.getChildByName("soundopensp").active = !0, this.soundBtn.getChildByName("soundclosesp").active = !1) : (ccLog("\u5173\u95ed\u97f3\u4e50"), engine.gameSound.stopMusic(), engine.gameSound.stopBackgroundMusic(), engine.gameSound.stopEffectMusic(), this.soundBtn.getChildByName("soundopensp").active = !1, this.soundBtn.getChildByName("soundclosesp").active = !0)
			},
			soundbtnFun: function() {
				1 == heroData.getSoundState() ? heroData.closeSound() : heroData.openSound(), this.refreshSoundState()
			},
			initData: function() {
				var e = heroData.getExp(),
					t = heroData.getLv(),
					n = gameConfigData.getLvExpInfo(heroData.getLv());
				Util.setPic(this.node.getChildByName("honorhead"), "uipng/gradeIcon/" + n.name), heroData.getLv() >= gameConfigData.lvExpInfo.max ? this.node.getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(n.languageId, heroData.getLv() - gameConfigData.lvExpInfo.max + 1) : this.node.getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(n.languageId, n.languageValue), this.progressBar.getComponent(cc.ProgressBar).progress = e / n.exp, this.progressBar.getChildByName("protxt").getComponent(cc.Label).string = e + "/" + n.exp;
				var a = gameConfigData.getRandomBot();
				Util.setPic(this.node.getChildByName("main_pass").getChildByName("headSp"), "uipng/bot_head/bot" + a.head), this.node.getChildByName("main_pass").getChildByName("nameLabel").getComponent(cc.Label).string = a.name;
				var i = ~~((t - 1) / 3);
				i = Math.min(4, i), Util.setPic(this.node.getChildByName("honorhead").getChildByName("gradebg"), "uipng/gradeIcon/gradebg" + i), this.node.getChildByName("main_pass").getChildByName("pass_label").getComponent(cc.Label).string = Util.getLanguage(1013)
			},
			clickStartBtn: function() {
				if (debugTest.useStartBtnTest) MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.result);
				else {
					gamePlayCFG.skillAttrArr = [];
					for (var e = 0; e < heroData.skillLevelArr.length; e++) {
						var t = heroData.skillLevelArr[e];
						if (0 != t) {
							var n = 100 * (e + 1) + t,
								a = (i = gameConfigData.skillData[n]).value * (i.valueDir ? 1 : -1);
							gamePlayCFG.skillAttrArr[i.attrIndex] = a
						}
					}
					gamePlayCFG.selfAttrArr = [];
					var i, o = heroData.playerSkinInfo.select;
					a = (i = gameConfigData.playerSkinInfo[o]).value * (i.valueDir ? 1 : -1), gamePlayCFG.selfAttrArr[i.attrIndex] = a, gameConfigData.objDeepCopy(gameConfigData.gameRankData.otherFriendArr).unshift({
						photo: gameSDK.sdkPlayInfo.photo,
						name: gameSDK.sdkPlayInfo.name
					}), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.vs)
				}
			},
			clickSkinShopBtn: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.skinShop)
			},
			clicTestBtn: function() {
				debugTest.allowTestBtn && MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_match_prefab)
			},
			clickRankBtn: function() {
				if (debugTest.rankTestLevel) {
					var e = heroData.getLv();
					return ++e > 20 && (e = 0), heroData.setLv(e), void cc.error("\u4e34\u65f6\u7528\u6765\u8bbe\u7f6e\u7b49\u7ea7\u4e3a:", e)
				}
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.rank)
			},
			clickTaskBtn: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.task)
			},
			clickSkillBtn: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.skill)
			},
			clickMulGameBtn: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_match_prefab)
			},
			clickFreeGoldBtn: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.getGoldByADs_many_prefab)
			},
			destroyNode: function() {
				this.node.destroy()
			},
			update: function(e) {
				var t = (new Date).getTime(),
					n = heroData.taskFlushTime - t;
				this.node.getChildByName("taskTime").getComponent(cc.Label).string = "" + Util.formatTime(n), t >= heroData.taskFlushTime && heroData.flushTask(), (taskTimeCheck += e) > .1 && (taskTimeCheck = 0, this.taskBtn.getChildByName("task_red").active = heroData.anyTaskCanFinish(), this.skillBtn.getChildByName("main_red").active = heroData.anySkillCanUpdate())
			}
		});
		var taskTimeCheck = 0;
		cc._RF.pop()
	}, {}],
	more_game_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "75415WHy1ZCUa0Nj2ZaRjTs", "more_game_view"), cc.Class({
			extends: cc.Component,
			properties: {
				closebtn: null,
				watchbtn: null
			},
			onLoad: function() {
				this.closebtn = this.node.getChildByName("closebtn"), this.btn1 = this.node.getChildByName("btn_1"), this.btn2 = this.node.getChildByName("btn_2"), this.closebtn.on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this);
				for (var e = 0; e < 4; e++) {
					var t = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.moregame_item_prefab, this.node.getChildByName("scrollView").getChildByName("view").getChildByName("content"), e);
					MyGameEvent.emit(MyGameEvent.createPrefab, t)
				}
			},
			onDestroy: function() {
				this.closebtn.off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this)
			},
			clickCloseBtn: function() {
				this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	moregame_item_prefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "37bcdjBUCNGWak/d55Ex9TD", "moregame_item_prefab"), cc.Class({
			extends: cc.Component,
			properties: {
				index: 0,
				playBtn: null
			},
			onDestroy: function() {
				this.playBtn.off(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this)
			},
			setData: function(e) {
				this.index = e, this.node.position = cc.v2(0, -490 - 225 * (this.index - 1)), this.node.getChildByName("game_name").getComponent(cc.Label).string = moreGameInfo[this.index + 1].name, this.node.getChildByName("readmeLabel").getComponent(cc.Label).string = moreGameInfo[this.index + 1].des, Util.setPic(this.node.getChildByName("game_icon"), "uipng/moregame/icon_" + (this.index + 1)), this.playBtn = this.node.getChildByName("play_btn"), this.playBtn.on(cc.Node.EventType.TOUCH_END, this.clickPlayBtn, this)
			},
			clickPlayBtn: function() {
				var e = moreGameInfo[this.index + 1].id;
				gameSDK.goToOtherGame(e)
			}
		}), cc._RF.pop()
	}, {}],
	mul_game_match_prefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "1fe61RknRpLWrRPFK+8cfCM", "mul_game_match_prefab"), cc.Class({
			extends: cc.Component,
			properties: {
				addBtn: null,
				cutBtn: null,
				closeBtn: null,
				startBtn: null,
				showFee: 0
			},
			onDestroy: function() {
				this.addBtn.off(cc.Node.EventType.TOUCH_END, this.clickAdd, this), this.cutBtn.off(cc.Node.EventType.TOUCH_END, this.clickCut, this), this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.clickClose, this), this.startBtn.off(cc.Node.EventType.TOUCH_END, this.clickStart, this), this.addBtn = null, this.cutBtn = null, this.closeBtn = null, this.startBtn = null
			},
			start: function() {
				this.showFee = 100, this.addBtn = this.node.getChildByName("btnAdd"), this.cutBtn = this.node.getChildByName("btnCut"), this.startBtn = this.node.getChildByName("startbtn"), this.closeBtn = this.node.getChildByName("closebtn"), this.addBtn.on(cc.Node.EventType.TOUCH_END, this.clickAdd, this), this.cutBtn.on(cc.Node.EventType.TOUCH_END, this.clickCut, this), this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.clickClose, this), this.startBtn.on(cc.Node.EventType.TOUCH_END, this.clickStart, this)
			},
			clickAdd: function() {
				heroData.gold < this.showFee + 100 || (this.showFee += 100)
			},
			clickCut: function() {
				100 != this.showFee && (this.showFee -= 100)
			},
			clickClose: function() {
				this.node.destroy()
			},
			clickStart: function() {
				heroData.gold >= this.showFee ? (heroData.gold -= this.showFee, CFG.mul_game_fee = this.showFee, heroData.saveData(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_prefab)) : MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.buygem)
			},
			update: function() {
				this.node.getChildByName("moneyLabel").getComponent(cc.Label).string = this.showFee + "", this.node.getChildByName("1stMoneyLabel").getComponent(cc.Label).string = 2 * this.showFee + "", this.addBtn.getComponent(cc.Button).interactable = heroData.gold >= this.showFee + 100, this.cutBtn.getComponent(cc.Button).interactable = 100 != this.showFee
			}
		}), cc._RF.pop()
	}, {}],
	mul_game_personHead: [function(e, t) {
		"use strict";
		cc._RF.push(t, "2d98a3jF9tLc55VeCX1OINj", "mul_game_personHead");
		var n = [
			[-252.47, 403.02],
			[-90.91, 403.02],
			[86.8, 403.02],
			[248.36, 403.02],
			[-252.47, -371.15],
			[-90.91, -371.15],
			[86.8, -371.15],
			[248.36, -371.15],
			[-171.54, 232.5],
			[168.37, 232.5],
			[-171.54, -195.2],
			[168.37, -195.2],
			[-126.01, 13.48],
			[122.84, 13.48]
		];
		cc.Class({
			extends: cc.Component,
			properties: {
				headUrl: ""
			},
			setData: function(e) {
				var t = ~~e.index,
					a = n[t];
				if (this.node.position = cc.v2(a[0], a[1]), e.info) {
					this.headUrl = e.info.photo;
					var i = gameConfigData.createHeadNode(e.info.photo, 78);
					if (i.name = "headNode", this.node.addChild(i), this.node.getChildByName("nameLabel").getComponent(cc.Label).string = e.info.name, e.info.photo == gameSDK.sdkPlayInfo.photo && (Util.setPic(this.node.getChildByName("rect"), "uipng/mul_game/mul_game_self_rect"), this.node.getChildByName("nameLabel").color = cc.color(229, 86, 25), this.node.getChildByName("self_frame").active = !0), -1 != CFG.mul_game_fail_person_photo_arr.indexOf(e.info.photo)) {
						var o = this.node.getChildByName("rect").getComponent(cc.Sprite);
						o.setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", o)), (o = this.node.getChildByName("headNode").getComponent(cc.Sprite)).setMaterial(0, cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", o)), this.node.getChildByName("nameLabel").color = cc.color(91, 91, 91)
					}
				}
			}
		}), cc._RF.pop()
	}, {}],
	mul_game_prefab: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "3fbb4/USXdKW4L0Bu2WjTPO", "mul_game_prefab");
		var a = 0;
		cc.Class({
			extends: cc.Component,
			properties: {
				personArr: []
			},
			onDestroy: function() {
				this.personArr = [], n.off(cc.Node.EventType.TOUCH_END, this.clickStart, this), n = null
			},
			start: function() {
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), CFG.mul_game_model = 0;
				var t = CFG.mul_game_seed;
				t || (CFG.mul_game_forever_model = 0, CFG.mul_game_win_time = 0, CFG.mul_game_fail_person_photo_arr = [], t = (new Date).getTime() % 133, CFG.mul_game_seed = t);
				for (var a = [], i = 1; i < 18; i++) a.push(i);
				a = Util.shufferArryBySeed(a, t);
				var o = gameConfigData.robotNameArr.slice();
				o = Util.shufferArryBySeed(o, t);
				var s = [],
					r = [];
				for (i = 0; i < 7; i++) r.push({
					photo: "bot" + a[i],
					name: o[i]
				});
				r.push({
					photo: gameSDK.sdkPlayInfo.photo,
					name: gameSDK.sdkPlayInfo.name
				}), r = Util.shufferArryBySeed(r, t);
				var l = [],
					c = Util.getRandomBySeed(CFG.mul_game_seed).toString().slice(2).split("");
				if (CFG.mul_game_win_time > 0)
					for (i = 0; i < 8; i += 2) u(i);
				if (CFG.mul_game_win_time > 1)
					for (i = 8; i < 12; i += 2) u(i);
				if (this.flushLineStyle(l), 3 == CFG.mul_game_win_time) {
					var h = r[12],
						d = r[13];
					h.photo == gameSDK.sdkPlayInfo.photo ? s.push(d.photo) : s.push(h.photo), this.node.getChildByName("startbtn").getChildByName("btnLabel").getComponent(cc.Label).string = "OK"
				}

				function u(e) {
					var t = r[e],
						n = r[e + 1];
					t.photo == gameSDK.sdkPlayInfo.photo || n.photo == gameSDK.sdkPlayInfo.photo ? (r.push({
						photo: gameSDK.sdkPlayInfo.photo,
						name: gameSDK.sdkPlayInfo.name
					}), t.photo == gameSDK.sdkPlayInfo.photo ? (l.push(2), s.push(n.photo)) : (l.push(3), s.push(t.photo))) : c.shift() % 2 == 1 ? (r.push(t), l.push(0), s.push(n.photo)) : (r.push(n), l.push(1), s.push(t.photo))
				}
				for ((n = this.node.getChildByName("startbtn")).on(cc.Node.EventType.TOUCH_END, this.clickStart, this), CFG.mul_game_fail_person_photo_arr = s, this.personArr = r, this.createPersonHead(r), i = r.length - 1; i > 0; i -= 2)
					if (h = r[i], d = r[i - 1], h.photo == gameSDK.sdkPlayInfo.photo || d.photo == gameSDK.sdkPlayInfo.photo) return void(h.photo == gameSDK.sdkPlayInfo.photo ? CFG.mul_game_bot = d : CFG.mul_game_bot = h)
			},
			createPersonHead: function(e) {
				var t = this.node.getChildByName("show").getChildByName("heads");
				a = [0, 8, 12, 14][CFG.mul_game_win_time];
				for (var n = 0; n < 14; n++) {
					var i = e[n],
						o = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.mul_game_personHead, t, {
							index: n,
							info: i
						});
					n < a && MyGameEvent.emit(MyGameEvent.createPrefab, o)
				}
				this.schedule(this.AddOneByOne, .5)
			},
			AddOneByOne: function() {
				if (a < this.personArr.length) {
					var e = this.node.getChildByName("show").getChildByName("heads"),
						t = this.personArr[a],
						n = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.mul_game_personHead, e, {
							index: a,
							info: t
						});
					MyGameEvent.emit(MyGameEvent.createPrefab, n), a++
				} else this.unscheduleAllCallbacks(), this.node.getChildByName("startbtn").active = !0, this.node.getChildByName("startbtn").runAction(cc.sequence(cc.scaleTo(.25, 1.1, 1.1), cc.scaleTo(.15, .9, .9), cc.scaleTo(.1, 1, 1)).repeatForever())
			},
			flushLineStyle: function(e) {
				for (var t = this.node.getChildByName("show").getChildByName("lines"), n = 0; n < e.length; n++) {
					var a = e[n],
						i = 0;
					a > 1 && (a -= 2, i = 1);
					var o = t.getChildByName("line" + n + a);
					i ? Util.setPic(o, "uipng/mul_game/mul_game_red") : Util.setPic(o, "uipng/mul_game/mul_game_blue"), o.zIndex = 12
				}
			},
			clickStart: function() {
				var e = this;
				if (!CFG.mul_game_model)
					if (CFG.mul_game_win_time >= 3) CFG.mul_game_model = 0, CFG.mul_game_win_time = 0, CFG.mul_game_seed = null, MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.black_mask), this.node.destroy(), cc.director.loadScene("MainScene", function() {
						CFG.reset()
					});
					else {
						CFG.mul_game_model = 1;
						var t = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012];
						t.splice(t.indexOf(heroData.playerSkinInfo.select), 1);
						var n = t[~~(t.length * Math.random())];
						CFG.randomOtherTeamId = n - 1e3, gamePlayCFG.enemyAttrArr = [];
						var a = gameConfigData.playerSkinInfo[n],
							i = a.value * (a.valueDir ? 1 : -1);
						gamePlayCFG.enemyAttrArr[a.attrIndex] = i, CFG.mul_game_score = [0, 0], this.scheduleOnce(function() {
							e.node.destroy(), cc.director.loadScene("FightScene", function() {})
						}, .5), MyGameEvent.emit(MyGameEvent.showBlackMaskRun)
					}
			}
		}), cc._RF.pop()
	}, {}],
	mul_game_result_prefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e45f3MBJ5pMcbSrkTyCSc5H", "mul_game_result_prefab"), cc.Class({
			extends: cc.Component,
			properties: {
				continueBtn: null
			},
			onDestroy: function() {
				this.continueBtn.off(cc.Node.EventType.TOUCH_END, this.clickStart, this), this.continueBtn = null
			},
			start: function() {
				MyGameEvent.emit(MyGameEvent.mul_game_reset), gameSDK.faceBookAdvertisement.showInterstitialAD(4);
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.node.getChildByName("score_self").getComponent(cc.Label).string = CFG.mul_game_score[0] + "", this.node.getChildByName("score_enemy").getComponent(cc.Label).string = CFG.mul_game_score[1] + "";
				var t = gameConfigData.createHeadNode(gameSDK.sdkPlayInfo.photo, 56);
				if (this.node.getChildByName("self_mask").addChild(t), t = gameConfigData.createHeadNode(CFG.mul_game_bot.photo, 56), this.node.getChildByName("enemy_mask").addChild(t), 3 == CFG.mul_game_win_time) {
					this.node.getChildByName("win").active = !0;
					var n = parseInt(2 * CFG.mul_game_fee);
					MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
						pos: cc.v2(0, 0),
						num: n
					})), this.node.getChildByName("gold").getChildByName("goldLabel").getComponent(cc.Label).string = n + ""
				} else this.node.getChildByName("lose").active = !0, this.node.getChildByName("gold").active = !1;
				CFG.mul_game_win_time = 0, this.continueBtn = this.node.getChildByName("continueBtn"), this.continueBtn.on(cc.Node.EventType.TOUCH_END, this.clickStart, this);
				var a = heroData.getExp(),
					i = heroData.getLv(),
					o = gameConfigData.getLvExpInfo(i),
					s = o.exp,
					r = gameConfigData.getLvExpInfo(i).name;
				Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead"), "uipng/gradeIcon/" + r);
				var l = ~~((i - 1) / 3);
				l = Math.min(4, l), Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead").getChildByName("gradebg"), "uipng/gradeIcon/gradebg" + l), this.progressBar = this.node.getChildByName("progressbg"), this.progressBar.getComponent(cc.ProgressBar).progress = a / s, this.progressBar.getChildByName("protxt").getComponent(cc.Label).string = a + "/" + s, i >= gameConfigData.lvExpInfo.max ? this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(o.languageId, i - gameConfigData.lvExpInfo.max + 1) : this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(o.languageId, o.languageValue)
			},
			clickStart: function() {
				CFG.mul_game_model = 0, MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.black_mask), this.node.destroy(), cc.director.loadScene("MainScene", function() {
					CFG.reset()
				})
			}
		}), cc._RF.pop()
	}, {}],
	mul_game_step_win_prefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e1968q+51NM/qw+dDRjVEO+", "mul_game_step_win_prefab"), cc.Class({
			extends: cc.Component,
			properties: {
				continueBtn: null
			},
			onDestroy: function() {
				this.continueBtn.off(cc.Node.EventType.TOUCH_END, this.clickStart, this), this.continueBtn = null
			},
			start: function() {
				CFG.mul_game_win_time++, gameSDK.faceBookAdvertisement.showInterstitialAD(5), this.node.getChildByName("yanhua1").active = !0, this.node.getChildByName("yanhua2").active = !0;
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.node.getChildByName("score_self").getComponent(cc.Label).string = CFG.mul_game_score[0] + "", this.node.getChildByName("score_enemy").getComponent(cc.Label).string = CFG.mul_game_score[1] + "";
				var t = gameConfigData.createHeadNode(gameSDK.sdkPlayInfo.photo, 56);
				this.node.getChildByName("self_mask").addChild(t), t = gameConfigData.createHeadNode(CFG.mul_game_bot.photo, 56), this.node.getChildByName("enemy_mask").addChild(t), this.node.getChildByName("win").active = !0;
				var n = 50;
				3 == CFG.mul_game_win_time && (n = parseInt(2 * CFG.mul_game_fee)), MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
					pos: cc.v2(0, 0),
					num: n
				})), this.node.getChildByName("gold").getChildByName("goldLabel").getComponent(cc.Label).string = n + "", this.continueBtn = this.node.getChildByName("continueBtn"), this.continueBtn.on(cc.Node.EventType.TOUCH_END, this.clickStart, this);
				var a = heroData.getExp(),
					i = heroData.getLv(),
					o = gameConfigData.getLvExpInfo(i),
					s = o.exp,
					r = gameConfigData.getLvExpInfo(i).name;
				Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead"), "uipng/gradeIcon/" + r);
				var l = ~~((i - 1) / 3);
				l = Math.min(4, l), Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead").getChildByName("gradebg"), "uipng/gradeIcon/gradebg" + l), this.progressBar = this.node.getChildByName("progressbg"), this.progressBar.getComponent(cc.ProgressBar).progress = a / s, this.progressBar.getChildByName("protxt").getComponent(cc.Label).string = a + "/" + s, i >= gameConfigData.lvExpInfo.max ? this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(o.languageId, i - gameConfigData.lvExpInfo.max + 1) : this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(o.languageId, o.languageValue)
			},
			clickStart: function() {
				MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.mul_game_prefab), this.node.destroy()
			}
		}), cc._RF.pop()
	}, {}],
	mul_game_times_up_prefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "f7ba41H829NS4qy8XBDAS0L", "mul_game_times_up_prefab"), cc.Class({
			extends: cc.Component,
			properties: {
				isShow: !1
			},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.mul_game_reset, this.resetMul, this)
			},
			start: function() {
				MyGameEvent.on(MyGameEvent.mul_game_reset, this.resetMul, this)
			},
			resetMul: function() {
				this.node.getChildByName("timeLabel").getComponent(cc.Label).string = "", this.node.getChildByName("timeup").active = !1
			},
			update: function() {
				if (!CFG.mul_game_model || CFG.mul_game_forever_model) this.resetMul();
				else {
					var e = ~~CFG.mul_game_time;
					this.node.getChildByName("timeLabel").getComponent(cc.Label).string = e <= 10 && e >= 0 ? e + "" : "", 0 == e ? (this.node.getChildByName("timeup").active = !0, this.isShow || this.node.getChildByName("timeup").runAction(cc.sequence(cc.scaleTo(.3, 1.2, 1.2), cc.scaleTo(.15, .9, .9), cc.scaleTo(.1, 1, 1)).repeatForever()), this.isShow = !0) : (this.node.getChildByName("timeup").active = !1, this.isShow = !1)
				}
			}
		}), cc._RF.pop()
	}, {}],
	myPlayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a097dDc4tlMurZOpx8m+O9J", "myPlayer"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.resetAllPos, this.resetPos, this), MyGameEvent.off(MyGameEvent.stopWaitReset, this.stopWaitReset, this), this.unscheduleAllCallbacks()
			},
			start: function() {
				this.node.angle = 130, CFG.myPerson = this;
				var e = this.addComponent(CFG.both_attr);
				e.isEnemy = 0, e.isSelf = 1, this.addComponent("playerDir"), this.addComponent("playerSpeed"), this.addComponent("both_skin").setTeam(heroData.playerSkinInfo.select - 1e3);
				var t = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_run_smoke, cc.find("Canvas/game_effects"), this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, t), t = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_runCircle, cc.find("Canvas/game_effects"), this.node), MyGameEvent.emit(MyGameEvent.createPrefab, t), MyGameEvent.on(MyGameEvent.resetAllPos, this.resetPos, this), MyGameEvent.on(MyGameEvent.stopWaitReset, this.stopWaitReset, this)
			},
			onEnable: function() {
				this.update()
			},
			stopWaitReset: function() {
				this.node.getComponent(CFG.both_attr).resetAllAttr(), CFG.ballPos.y > 0 ? this.getComponent(CFG.both_attr).showVictory() : this.getComponent("both_skin").showSkin(playerSkinTypeEm.free)
			},
			setData: function() {
				this.node.position = cc.v2(-400, -400), this.update()
			},
			resetPos: function() {
				this.node.stopAllActions(), this.node.position = cc.v2(-400, -400), this.getComponent("both_skin").showSkin(playerSkinTypeEm.free), this.getComponent("playerDir").touchEndFun(), this.getComponent("playerSpeed").clearOldDir(), this.getComponent(CFG.both_attr).run_force = 0, cc.Camera.findCamera(this.node).node.position = this.node.position
			},
			update: function() {
				var e = cc.Camera.findCamera(this.node);
				if (e) {
					var t = cc.v2(-1e3, -1450),
						n = cc.v2(1e3, 1450),
						a = this.node.position;
					a = a.clampf(t, n), e.node.position = a, this.node.position
				}
			}
		}), cc._RF.pop()
	}, {}],
	npcDir: [function(e, t) {
		"use strict";
		cc._RF.push(t, "fd17c3AvH5JNKjk/N6LSVPH", "npcDir"), cc.Class({
			extends: cc.Component,
			properties: {
				dir: null
			},
			onDestroy: function() {
				this.dir = null, this.unscheduleAllCallbacks()
			},
			start: function() {},
			setInitDir: function() {
				var e = cc.v2(0, 1);
				this.getComponent(CFG.both_attr).isEnemy && (e = cc.v2(0, -1));
				var t = 90 - cc.misc.radiansToDegrees(Math.atan2(e.y, e.x));
				this.node.angle = 180 - t, this.getComponent(CFG.both_attr).lastDir = e
			},
			update: function() {
				if (!CFG.showVictory) {
					var e = null;
					if (this.getComponent(CFG.both_attr).dir && (e = this.getComponent(CFG.both_attr).dir), e) {
						var t = 90 - cc.misc.radiansToDegrees(Math.atan2(e.y, e.x));
						this.node.angle = 180 - t, this.getComponent(CFG.both_attr).lastDir = e
					}
				}
			}
		}), cc._RF.pop()
	}, {}],
	npcSpeed: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c7a28BVxz5DxKbxvBarsNcV", "npcSpeed"), cc.Class({
			extends: cc.Component,
			properties: {
				skin: null,
				speed: 0
			},
			onDestroy: function() {
				this.skin = null, this.speed = 0, this.unscheduleAllCallbacks()
			},
			start: function() {
				this.skin = this.node.getComponent("both_skin")
			},
			getSpeed: function() {
				var e = Util.getCFGValue(gamePlayCFG.maxRunSpeed, this);
				return this.getComponent(CFG.both_attr).run_force >= 1 && (e = Util.getCFGValue(gamePlayCFG.maxForceRunSpeed, this)), CFG.takeBallPerson == this.getComponent(CFG.both_attr) && (e = Util.getCFGValue(gamePlayCFG.maxTakeBallSpeed, this)), null != this.getComponent(CFG.both_attr).dir ? (this.speed += Util.getCFGValue(gamePlayCFG.addSpeed, this), this.speed = Math.min(this.speed, e)) : (this.speed -= Util.getCFGValue(gamePlayCFG.addSpeed, this), this.speed = Math.max(0, this.speed)), this.getComponent(CFG.both_attr).speed = this.speed, this.speed
			},
			update: function() {
				if (!CFG.showVictory && !this.getComponent(CFG.both_attr).lostControl) {
					var e = cc.v2(0, 0),
						t = this.getSpeed(),
						n = null;
					this.getComponent(CFG.both_attr).dir && (n = this.getComponent(CFG.both_attr).dir, (new Date).getTime() - this.getComponent(CFG.both_attr).tackleTime < 1e3 && (n = null, this.getComponent(CFG.both_attr).dir = null)), 0 != t && n && ((e = this.node.position.add(n.mul(t))).x = Math.round(e.x), e.y = Math.round(e.y), e.x, this.node.position.x, e.y, this.node.position.y, this.move(e.x, e.y)), this.getComponent(CFG.both_attr).checkNearBall()
				}
			},
			move: function(e, t) {
				CFG.takeBallPerson == this.getComponent(CFG.both_attr) && (e = cc.misc.clampf(e, -1200, 1200), t = Math.abs(e) < 230 ? cc.misc.clampf(t, -1980, 1980) : cc.misc.clampf(t, -1880, 1880)), this.node.x = e, this.node.y = t
			}
		}), cc._RF.pop()
	}, {}],
	npc_ai: [function(e, t) {
		"use strict";
		cc._RF.push(t, "375aaux7vhHRoghY0Ktf3Qv", "npc_ai"), cc.Class({
			extends: cc.Component,
			properties: {
				thinkEndPosTime: 0,
				thinkEndPos: null,
				lastRecordBallPos: null,
				runAction: null,
				lastDuobiTime: 0,
				lastChongZhuangTime: 0,
				chongzhuangPos: null,
				type: 0
			},
			setData: function(e) {
				this.type = e
			},
			thinkNextAction: function() {
				var e = null;
				if (!CFG.showVictory && CFG.ballPos) {
					switch (this.getComponent(CFG.both_attr).type) {
						case 0:
						case 1:
						case 5:
							e = this.thinkLikeQianfeng();
							break;
						case 2:
						case 3:
							e = this.thinkLikeHouwei();
							break;
						case 4:
							e = this.thinkLikeShoumen()
					}
					return e
				}
			},
			tackleHappenCheck: function() {
				if (!(Math.random() > Util.getCFGValue(gamePlayCFG.tacklePercent, this.getComponent(CFG.both_attr)))) {
					if (debugTest.stopTackle) return !1;
					var e = (new Date).getTime();
					if ((2 == this.type || 3 == this.type) && (this.getComponent(CFG.both_attr).isEnemy && e - CFG.sendBallToOtherEnemy < 1e3 || !this.getComponent(CFG.both_attr).isEnemy && e - CFG.sendBallToOther < 1e3)) return !1;
					if (e - this.getComponent(CFG.both_attr).tackleTime < 5e3) return !1;
					if (this.getComponent(CFG.both_attr).isEnemy && e - CFG.tackleEnemyHappenTime < 300 || !this.getComponent(CFG.both_attr).isEnemy && e - CFG.tackleHappenTime < 300) return !1;
					if (!(e - this.getComponent(CFG.both_attr).ignoreCloseBallTime < 300)) {
						var t = this.node.position.sub(CFG.ballPos).mag(),
							n = CFG.takeBallPerson && t <= 300 && this.getComponent(CFG.both_attr).run_force > .6;
						return n && (this.getComponent(CFG.both_attr).isEnemy ? CFG.tackleEnemyHappenTime = e : CFG.tackleHappenTime = e), n
					}
				}
			},
			thinkTakeBallWhereRun: function() {
				var e = cc.v2(this.node.position),
					t = cc.v2(0, -2e3);
				if (this.getComponent(CFG.both_attr).isEnemy || (t = cc.v2(0, 2e3)), Math.abs(e.x) > 820 || Math.abs(e.y) > 1350) return t;
				var n = (new Date).getTime();
				if (this.thinkEndPos && n - this.thinkEndPosTime < 500) return this.thinkEndPos;
				this.thinkEndPosTime = n, this.thinkEndPos = null;
				var a = "enemy";
				this.getComponent(CFG.both_attr).isEnemy && (a = "self");
				for (var i = [], o = 0; o < 6; o++) {
					var s = CFG.allMemberPos[a + o];
					if (s) {
						var r = e.sub(s).mag();
						r < 300 && (this.getComponent(CFG.both_attr).isEnemy && e.y > s.y && Math.abs(e.y - s.y) > 100 || !this.getComponent(CFG.both_attr).isEnemy && e.y < s.y && Math.abs(e.y - s.y) > 100) && (s.y = r, i.push(s))
					}
				}
				if (i.length > 0) {
					if (0 != this.lastDuobiTime && n - this.lastDuobiTime < 1500) {
						var l = this.checkSelfMemberNear();
						if (l) return this.lastDuobiTime = 0, {
							action: npcActions.shoot,
							pos: l
						}
					}
					i.sort(function(e, t) {
						return e.y > t.y ? 1 : -1
					});
					var c = 1;
					i[0].x > e.x && (c = -1);
					var h = 1;
					this.getComponent(CFG.both_attr).isEnemy && (h = -1);
					var d = cc.v2(500, 200);
					d = d.scale(cc.v2(c, h)), t = e.add(d), this.thinkEndPos = t, this.lastDuobiTime = n
				}
				return t
			},
			checkSelfMemberNear: function() {
				var e = cc.v2(this.node.position),
					t = "self";
				this.getComponent(CFG.both_attr).isEnemy && (t = "enemy");
				for (var n = 500, a = null, i = 0; i < 6; i++) {
					var o = cc.v2(CFG.allMemberPos[t + i]);
					if (!o.equals(cc.v2(0, 0)) && i != this.type) {
						var s = e.sub(o).mag();
						s < n && s > 100 && (n = s, a = o)
					}
				}
				return a
			},
			thinkWhereToGetBallRun: function() {
				var e = (new Date).getTime();
				return e - this.thinkEndPosTime < Util.getCFGValue(gamePlayCFG.thinkWhereRun, this.getComponent(CFG.both_attr)) ? this.lastRecordBallPos : (this.thinkEndPosTime = e, this.lastRecordBallPos = CFG.ballPos, this.lastRecordBallPos)
			},
			checkCanShootToQianfeng: function() {
				var e = this.node.position,
					t = CFG.ballPos.y;
				if ((!this.getComponent(CFG.both_attr).isEnemy && t > 50 || this.getComponent(CFG.both_attr).isEnemy && t < -50) && this.getComponent(CFG.both_attr).run_force > .5) {
					var n = cc.v2(0, -2e3);
					if (this.getComponent(CFG.both_attr).isEnemy || (n = cc.v2(0, 2e3)), e.sub(n).mag() < 400) return {
						action: npcActions.shoot,
						pos: n
					};
					var a = CFG.allMemberPos.enemy0,
						i = CFG.allMemberPos.enemy1;
					if (this.getComponent(CFG.both_attr).isEnemy) {
						if (a && a.y < e.y) return {
							action: npcActions.shoot,
							pos: a
						};
						if (i && i.y < e.y) return {
							action: npcActions.shoot,
							pos: i
						}
					} else {
						if (a = CFG.allMemberPos.self0, i = CFG.allMemberPos.self1, a && a.y > e.y) return {
							action: npcActions.shoot,
							pos: a
						};
						if (i && i.y > e.y) return {
							action: npcActions.shoot,
							pos: i
						}
					}
				}
				var o = this.thinkTakeBallWhereRun();
				return o.action ? o : {
					action: npcActions.run,
					pos: o
				}
			},
			backToBasePoint: function() {
				this.node.position.sub(this.getComponent("npc_person").basePoint).mag() <= 60 ? (this.getComponent(CFG.both_attr).dir = null, this.runAction = {
					action: npcActions.free
				}, this.getComponent("npcSpeed").speed = 0) : this.runAction = {
					action: npcActions.run,
					pos: this.getComponent("npc_person").basePoint
				}
			},
			qianfengThinkCanRunKickOther: function() {
				var e = (new Date).getTime();
				if (0 != this.lastChongZhuangTime && e - this.lastChongZhuangTime < 1e3) return {
					action: npcActions.run,
					pos: this.chongzhuangPos
				};
				var t = cc.v2(this.node.position),
					n = "enemy";
				this.getComponent(CFG.both_attr).isEnemy && (n = "self");
				for (var a = null, i = 0; i < 6; i++) {
					var o = CFG.allMemberPos[n + i];
					if (o && t.sub(o).mag() < 250 && CFG.allMemberSpeed[n + i] < this.getComponent(CFG.both_attr).speed) {
						a = o;
						break
					}
				}
				if (a) return this.chongzhuangPos = a, this.lastChongZhuangTime = e, {
					action: npcActions.run,
					pos: a
				};
				var s = cc.v2(250, 250);
				return this.node.position.x < CFG.ballPos.x && s.scaleSelf(cc.v2(-1, 1)), this.getComponent(CFG.both_attr).isEnemy && s.scaleSelf(cc.v2(1, -1)), s.addSelf(CFG.ballPos), {
					action: npcActions.run,
					pos: s
				}
			},
			thinkLikeQianfeng: function() {
				var e = (new Date).getTime();
				if (!(e - this.getComponent(CFG.both_attr).tackleTime < 500 || e - this.getComponent(CFG.both_attr).shootStartTime < 500)) {
					if (CFG.takeBallPerson != this.getComponent(CFG.both_attr))
						if (CFG.takeBallPerson && CFG.takeBallPerson.getComponent(CFG.both_attr).isEnemy == this.getComponent(CFG.both_attr).isEnemy) this.runAction = this.qianfengThinkCanRunKickOther();
						else if (this.tackleHappenCheck()) this.runAction = {
						action: npcActions.slide_tackle,
						pos: CFG.ballPos
					};
					else {
						var t = this.thinkWhereToGetBallRun();
						this.runAction = {
							action: npcActions.run,
							pos: t
						}
					} else {
						var n = this.thinkTakeBallWhereRun();
						if (n.action) return n;
						var a = cc.v2(0, -1800);
						this.getComponent(CFG.both_attr).isEnemy || (a = cc.v2(0, 1800));
						var i = this.node.position.sub(a).mag(),
							o = Util.getCFGValue(gamePlayCFG.shootHappenDis, this.getComponent(CFG.both_attr));
						if (i <= o) {
							var s = i / o,
								r = 400 * (.5 - Math.random()),
								l = cc.v2(r, -2e3);
							this.getComponent(CFG.both_attr).isEnemy || (l = cc.v2(r, 2e3)), Math.random() > 2 * s ? this.runAction = {
								action: npcActions.shoot,
								pos: l
							} : this.runAction = {
								action: npcActions.run,
								pos: n
							}
						} else this.runAction = {
							action: npcActions.run,
							pos: n
						}
					}
					return this.runAction
				}
			},
			thinkLikeHouwei: function() {
				var e = (new Date).getTime();
				if (!(e - this.getComponent(CFG.both_attr).tackleTime < 500 || e - this.getComponent(CFG.both_attr).shootStartTime < 500)) {
					var t = CFG.ballPos.y;
					if (CFG.takeBallPerson != this.getComponent(CFG.both_attr))
						if (CFG.takeBallPerson && CFG.takeBallPerson.getComponent(CFG.both_attr).isEnemy == this.getComponent(CFG.both_attr).isEnemy) this.backToBasePoint();
						else if (this.getComponent(CFG.both_attr).isEnemy && t > 50 || !this.getComponent(CFG.both_attr).isEnemy && t < -50)
						if (this.tackleHappenCheck()) this.runAction = {
							action: npcActions.slide_tackle,
							pos: CFG.ballPos
						};
						else {
							var n = this.thinkWhereToGetBallRun();
							this.runAction = {
								action: npcActions.run,
								pos: n
							}
						}
					else this.backToBasePoint();
					else this.runAction = this.checkCanShootToQianfeng();
					return this.runAction
				}
			},
			thinkLikeShoumen: function() {
				var e = (new Date).getTime();
				if (!(e - this.getComponent(CFG.both_attr).tackleTime < 500 || e - this.getComponent(CFG.both_attr).shootStartTime < 500)) {
					if (CFG.takeBallPerson != this.getComponent(CFG.both_attr))
						if (CFG.takeBallPerson && CFG.takeBallPerson.getComponent(CFG.both_attr).isEnemy == this.getComponent(CFG.both_attr).isEnemy) this.backToBasePoint();
						else {
							var t = CFG.ballPos.y;
							if (this.getComponent(CFG.both_attr).isEnemy && t > 600 || !this.getComponent(CFG.both_attr).isEnemy && t < -600)
								if (this.tackleHappenCheck()) this.runAction = {
									action: npcActions.slide_tackle,
									pos: CFG.ballPos
								};
								else {
									var n = this.thinkWhereToGetBallRun();
									this.runAction = {
										action: npcActions.run,
										pos: n
									}
								}
							else this.backToBasePoint()
						}
					else this.runAction = this.checkCanShootToQianfeng();
					return this.runAction
				}
			}
		}), cc._RF.pop()
	}, {}],
	npc_person: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b142056qUNNUabbob0bIzM7", "npc_person");
		var n = [cc.v2(-400, -400), cc.v2(400, -400), cc.v2(-450, -1100), cc.v2(450, -1100), cc.v2(0, -1400), cc.v2(0, 800)];
		cc.Class({
			extends: cc.Component,
			properties: {
				init: !1,
				runAction: null,
				hasAI: !0,
				basePoint: null
			},
			onDestroy: function() {
				this.init = !1, this.runAction = null, this.basePoint = null, MyGameEvent.off(MyGameEvent.stopWaitReset, this.stopWaitReset, this), MyGameEvent.off(MyGameEvent.resetAllPos, this.resetPos, this)
			},
			start: function() {
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_run_smoke, cc.find("Canvas/game_effects"), this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.runAction = {
					action: npcActions.free
				}, MyGameEvent.on(MyGameEvent.stopWaitReset, this.stopWaitReset, this), MyGameEvent.on(MyGameEvent.resetAllPos, this.resetPos, this), CFG.scheduleManager.pushUpdateFun(this.myUpdate.bind(this))
			},
			stopWaitReset: function() {
				this.node.getComponent(CFG.both_attr).resetAllAttr(), CFG.ballPos.y > 0 && !this.getComponent(CFG.both_attr).isEnemy || CFG.ballPos.y < 0 && this.getComponent(CFG.both_attr).isEnemy ? this.getComponent(CFG.both_attr).showVictory() : this.getComponent("both_skin").showSkin(playerSkinTypeEm.free)
			},
			resetPos: function() {
				5 == this.getComponent(CFG.both_attr).type && this.getComponent(CFG.both_attr).isEnemy && (heroData.continueWinTimes >= 4 && !CFG.mul_game_model ? (this.hasAI = !0, this.node.opacity = 255, this.basePoint = cc.v2(0, 800)) : (this.hasAI = !1, this.node.opacity = 0, this.basePoint = cc.v2(0, 13400))), this.node.position = this.basePoint, CFG.readyOverNpcNum++, this.node.stopAllActions(), this.runAction = null
			},
			setData: function(e) {
				var t = this.addComponent(CFG.both_attr);
				t.isEnemy = e.enemy, t.type = e.type;
				var a = heroData.playerSkinInfo.select - 1e3,
					i = n[t.type];
				e.enemy && (a = CFG.randomOtherTeamId, i = i.scale(cc.v2(1, -1))), this.basePoint = i, this.resetPos(), this.addComponent("both_skin").setTeam(a), this.addComponent("npcDir"), this.addComponent("npcSpeed"), this.addComponent("npc_ai").setData(e.type), this.init = !0
			},
			setPersonStand: function() {
				this.getComponent(CFG.both_attr).dir = null, this.getComponent("npcSpeed").speed = 0, this.getComponent(CFG.both_attr).speed = 0, this.getComponent(CFG.both_attr).lastPos = null, this.getComponent(CFG.both_attr).run_force = 0
			},
			myUpdate: function() {
				if (this.hasAI && !CFG.waitForStart && !CFG.showVictory && !this.getComponent(CFG.both_attr).lostControl) {
					var e = (new Date).getTime();
					if (!(e - this.getComponent(CFG.both_attr).tackleTime < Util.getCFGValue(gamePlayCFG.tackleFreezeTime, this)) && (this.runAction = this.getComponent("npc_ai").thinkNextAction(), this.init && this.runAction)) switch (this.runAction.action) {
						case npcActions.free:
							this.getComponent("both_skin").showSkin(playerSkinTypeEm.free), this.getComponent("npcDir").setInitDir();
							break;
						case npcActions.run:
							this.runAction.pos || (this.runAction.pos = CFG.ballPos), this.node.position.sub(this.runAction.pos).mag() < 60 ? this.setPersonStand() : (this.getComponent(CFG.both_attr).dir = this.runAction.pos.sub(this.node.position).normalizeSelf(), this.getComponent("both_skin").showSkin(playerSkinTypeEm.run));
							break;
						case npcActions.slide_tackle:
							this.getComponent(CFG.both_attr).dir = CFG.ballPos.sub(this.node.position).normalizeSelf(), this.getComponent(CFG.both_attr).showTackle(), this.runAction = null;
							break;
						case npcActions.shoot:
							var t = this.runAction.pos;
							t || (t = cc.v2(0, -2e3), this.getComponent(CFG.both_attr).isEnemy || (t = cc.v2(0, 2e3))), this.getComponent(CFG.both_attr).isEnemy ? CFG.sendBallToOtherEnemy = e : CFG.sendBallToOther = e, this.getComponent(CFG.both_attr).dir = t.sub(this.node.position).normalizeSelf(), this.getComponent(CFG.both_attr).showShoot(), this.runAction = null
					}
				}
			}
		}), cc._RF.pop()
	}, {}],
	playerDir: [function(e, t) {
		"use strict";
		cc._RF.push(t, "00b0eKabE5BnIYVFg+nniGe", "playerDir");
		var n = null;
		cc.Class({
			extends: cc.Component,
			properties: {
				myPlayer: null,
				dir: null
			},
			onDestroy: function() {
				this.myPlayer = null, this.dir = null, n.off(cc.Node.EventType.TOUCH_START, this.touchBeginFun, this), n.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveFun, this), n.off(cc.Node.EventType.TOUCH_END, this.touchEndFun, this), n.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelFun, this), n = null, this.unscheduleAllCallbacks()
			},
			start: function() {
				this.myPlayer = this.node, (n = cc.find("Canvas")).on(cc.Node.EventType.TOUCH_START, this.touchBeginFun, this), n.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveFun, this), n.on(cc.Node.EventType.TOUCH_END, this.touchEndFun, this), n.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelFun, this)
			},
			touchBeginFun: function(e) {
				CFG.showVictory || (new Date).getTime() - CFG.fireStartTime < 350 || (this.getComponent(CFG.both_attr).run_force = 0, this.clickPos = e.getLocation(), MyGameEvent.emit(MyGameEvent.removeGuideFinger))
			},
			touchMoveFun: function(e) {
				if (!this.getComponent(CFG.both_attr).lostControl && !(CFG.showVictory || (new Date).getTime() - CFG.fireStartTime < 350)) {
					null == this.clickPos && (this.clickPos = cc.v2(360, 640));
					var t = e.getLocation();
					if (this.clickPos != t && !(cc.v2(t.x, t.y).sub(cc.v2(this.clickPos.x, this.clickPos.y)).mag() < 5)) {
						var n = cc.v2(t.x, t.y).sub(cc.v2(this.clickPos.x, this.clickPos.y)).normalize();
						0 == n.x && 0 == n.y && (n = cc.v2(0, 1)), this.dir = n, this.getComponent(CFG.both_attr).dir = n
					}
				}
			},
			touchEndFun: function() {
				CFG.showVictory || (this.getComponent(CFG.both_attr).dir = null)
			},
			touchCancelFun: function() {
				this.getComponent(CFG.both_attr).dir = null
			},
			update: function() {
				if (CFG.showVictory) this.getComponent(CFG.both_attr).dir = null;
				else {
					var e = null;
					if (this.getComponent(CFG.both_attr).dir && (e = this.getComponent(CFG.both_attr).dir), e) {
						var t = 90 - cc.misc.radiansToDegrees(Math.atan2(e.y, e.x));
						this.node.angle = 180 - t, this.getComponent(CFG.both_attr).lastDir = e
					}
				}
			}
		}), cc._RF.pop()
	}, {}],
	playerSpeed: [function(e, t) {
		"use strict";
		cc._RF.push(t, "c66a86GIeNLW52HNvGQM8o3", "playerSpeed");
		var n = null;
		cc.Class({
			extends: cc.Component,
			properties: {
				skin: null,
				speed: 0
			},
			onDestroy: function() {
				this.unscheduleAllCallbacks(), this.skin = null, this.speed = 0, n = null, this.unscheduleAllCallbacks()
			},
			start: function() {
				this.skin = this.node.getComponent("both_skin")
			},
			getSpeed: function() {
				var e = Util.getCFGValue(gamePlayCFG.maxRunSpeed, this);
				return this.getComponent(CFG.both_attr).run_force >= 1 && (e = Util.getCFGValue(gamePlayCFG.maxForceRunSpeed, this)), CFG.takeBallPerson == this.getComponent(CFG.both_attr) && (e = Util.getCFGValue(gamePlayCFG.maxTakeBallSpeed, this)), null != this.getComponent(CFG.both_attr).dir ? (0 == this.speed && (this.speed = Util.getCFGValue(gamePlayCFG.maxRunSpeed, this)), this.speed += Util.getCFGValue(gamePlayCFG.addSpeed, this), this.speed = Math.min(this.speed, e)) : (this.speed -= Util.getCFGValue(gamePlayCFG.addSpeed, this), this.speed = Math.max(0, this.speed)), this.getComponent(CFG.both_attr).speed = this.speed, this.speed
			},
			clearOldDir: function() {
				n = null
			},
			update: function() {
				if (!this.getComponent(CFG.both_attr).lostControl && !CFG.showVictory) {
					0 == this.speed && this.getComponent("both_skin").showSkin(playerSkinTypeEm.free);
					var e = cc.v2(0, 0),
						t = this.getSpeed();
					this.getComponent(CFG.both_attr).dir ? n = this.getComponent(CFG.both_attr).dir : null != n && (new Date).getTime() - this.getComponent(CFG.both_attr).climbUpTime > 2e3 && (CFG.takeBallPerson == this.getComponent(CFG.both_attr) ? (cc.log("\u81ea\u5df1\u6301\u7403,\u5c04\u95e8"), this.getComponent(CFG.both_attr).showShoot()) : (cc.log("\u94f2\u7403"), this.getComponent(CFG.both_attr).showTackle()), n = null), 0 != t && n && ((e = this.node.position.add(n.mul(t))).x = Math.round(e.x), e.y = Math.round(e.y), e.x, this.node.position.x, e.y, this.node.position.y, this.move(e.x, e.y)), this.getComponent(CFG.both_attr).checkNearBall()
				}
			},
			move: function(e, t) {
				CFG.takeBallPerson == this.getComponent(CFG.both_attr) && (e = cc.misc.clampf(e, -1200, 1200), t = Math.abs(e) < 230 ? cc.misc.clampf(t, -1980, 1980) : cc.misc.clampf(t, -1880, 1880)), this.node.x = e, this.node.y = t, this.getComponent("both_skin").showSkin(playerSkinTypeEm.run)
			}
		}), cc._RF.pop()
	}, {}],
	prefabManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "45e2fSHUrVLjqul/R6ewzRF", "prefabManager"), window.GamePrefabConfig = {
			createPrefabInitData: function(e, t, n) {
				return e.data = n, e.parent = t, e
			},
			gamePlayer: {
				ui: mustLoadPrefab.player_prefab,
				js: "myPlayer"
			},
			npcPlayer: {
				ui: mustLoadPrefab.player_prefab,
				js: "npc_person"
			},
			gameBall: {
				ui: mustLoadPrefab.ball_prefab,
				js: "gameBall"
			},
			prefab_run_smoke: {
				ui: mustLoadPrefab.run_smoke_prefab,
				js: "runSmoke"
			},
			prefab_kick_effect: {
				ui: mustLoadPrefab.kick_effect_prefab,
				js: "kickEffect"
			},
			prefab_runCircle: {
				ui: mustLoadPrefab.runCircle_prefab,
				js: "runCircle"
			},
			prefab_ballOutCamera: {
				ui: mustLoadPrefab.ballOutCamera,
				js: "gameBallOutCamera"
			},
			prefab_game_guide: {
				ui: mustLoadPrefab.game_guide,
				js: "gameGuide"
			},
			prefab_gold_fly: {
				ui: mustLoadPrefab.gold_fly,
				js: "gold_fly"
			},
			prefab_skill_list: {
				ui: mustLoadPrefab.skill_list,
				js: "skill_list"
			},
			gold_show_add_ui: {
				ui: mustLoadPrefab.gold_show_add_ui,
				pos: [0, 0],
				js: "gold_show_add_ui"
			},
			moregame_item_prefab: {
				ui: mustLoadPrefab.moregame_item_prefab,
				js: "moregame_item_prefab"
			},
			mul_game_personHead: {
				ui: mustLoadPrefab.mul_game_personHead,
				js: "mul_game_personHead"
			}
		}, cc.Class({
			extends: cc.Component,
			properties: {
				minSizeCheckTime: 0
			},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.createPrefab, this.buildPrefab, this)
			},
			start: function() {
				MyGameEvent.on(MyGameEvent.createPrefab, this.buildPrefab, this)
			},
			buildPrefab: function(e) {
				var t = engine.gameMemoryManagement.getPrefab(e.ui);
				if (e.parent) {
					if (e.parent.addChild(t), e.js) {
						var n = t.addComponent(e.js);
						null != e.data && (n.setData ? n.setData(e.data) : cc.error("\u811a\u672c\u672a\u5b9e\u73b0 setData", e))
					}
				} else cc.error("\u672a\u8bbe\u5b9a\u521b\u5efa\u9884\u5236\u4ef6\u7684\u7236\u8282\u70b9")
			},
			update: function() {}
		}), cc._RF.pop()
	}, {}],
	rankItem: [function(e, t) {
		"use strict";
		cc._RF.push(t, "9cf06lPVNxEBb/eYdXATJuc", "rankItem"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {},
			start: function() {},
			init: function(e, t) {
				t % 2 != 0 && (this.node.getChildByName("bg").getChildByName("bg_white").active = !1), this.node.getChildByName("bg").getChildByName("rankNumLabel").getComponent(cc.Label).string = t, e.name.length > 10 && (e.name = e.name.slice(0, 10), e.name += "..."), this.node.getChildByName("bg").getChildByName("nameLabel").getComponent(cc.Label).string = e.name;
				var n = gameConfigData.createHeadNode(e.photo, 84);
				if (this.node.getChildByName("bg").getChildByName("icon").addChild(n), this.node.getChildByName("bg").getChildByName("score").getComponent(cc.Label).string = "score:" + e.score, t <= 3) {
					var a = "uipng/rank/rank_" + t;
					Util.setPic(this.node.getChildByName("bg").getChildByName("crown"), a)
				}
				if (e.playerID === gameSDK.sdkPlayInfo.playerID) {
					var i = this.node.getChildByName("bg");
					i.getChildByName("bg1").active = !0, i.getChildByName("bg2").active = !1, i.getChildByName("bg_white").active = !1, i.getChildByName("nameLabel").color = cc.color().fromHEX("#E55619"), i.getChildByName("score").color = cc.color().fromHEX("#E55619")
				}
			}
		}), cc._RF.pop()
	}, {}],
	rankPrefab: [function(e, t) {
		"use strict";
		cc._RF.push(t, "6e569Yj67JFJLd7TTbKsLYT", "rankPrefab");
		var n = null;
		cc.Class({
			extends: cc.Component,
			properties: {
				worldRankNode: null,
				friendRankNode: null,
				worldRankBtn: null,
				friendRankBtn: null,
				worldRankData: null,
				friendRankData: null,
				isGetWorldRankData: !1,
				getWorldRankDataTime: 0,
				isGetFriendRankData: !1,
				getFriendRankDataTime: 0
			},
			onDestroy: function() {
				this.worldRankBtn = null, this.friendRankBtn = null, n.off(cc.Node.EventType.TOUCH_END, this.btn_share, this), n = null
			},
			onLoad: function() {
				debugTest.arabic_model && (this.node.getChildByName("closeBtn").x = 300)
			},
			start: function() {
				(n = this.node.getChildByName("rankNode").getChildByName("inviteBtn")).on(cc.Node.EventType.TOUCH_END, this.btn_share, this), 0 == shareOrAdList[2] && (n.active = !1), this.worldRankBtn = this.node.getChildByName("rankNode").getChildByName("worldRankBtn"), this.worldRankBtn.active = !1, this.friendRankBtn = this.node.getChildByName("rankNode").getChildByName("friendRankBtn"), this.friendRankBtn.active = !1, this.worldRankNode = this.node.getChildByName("rankNode").getChildByName("worldRankNode"), this.worldRankNode.active = !1, this.friendRankNode = this.node.getChildByName("rankNode").getChildByName("friendRankNode"), this.friendRankNode.active = !0, this.closeBtn = this.node.getChildByName("closeBtn"), this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.btn_close, this), this.init(), this.node.getChildByName("rankNode").getChildByName("worldRankBtn").getChildByName("rankBtn1").getComponent(cc.Label).string = Util.getLanguage(1015), this.node.getChildByName("rankNode").getChildByName("worldRankBtn").getChildByName("rankBtn2").getComponent(cc.Label).string = Util.getLanguage(1015), this.node.getChildByName("rankNode").getChildByName("friendRankBtn").getChildByName("rankBtn1").getComponent(cc.Label).string = Util.getLanguage(1016), this.node.getChildByName("rankNode").getChildByName("friendRankBtn").getChildByName("rankBtn2").getComponent(cc.Label).string = Util.getLanguage(1016)
			},
			init: function() {
				this.createFriendRank()
			},
			createWorldRank: function() {
				this.worldRankData = gameConfigData.gameRankData.getRankData(1), 0 === this.worldRankData.length ? this.isGetWorldRankData = !0 : (this.createRank(this.worldRankData, 1), this.isGetWorldRankData = !1)
			},
			createFriendRank: function() {
				this.friendRankData = gameConfigData.gameRankData.getRankData(2).length > 0 ? gameConfigData.gameRankData.getRankData(2) : rankData, 0 === this.friendRankData.length ? this.isGetFriendRankData = !0 : (this.createRank(this.friendRankData, 2), this.isGetFriendRankData = !1)
			},
			createRank: function(e, t) {
				var n = this.node.getChildByName("rankNode"),
					a = null;
				1 === t ? (a = n.getChildByName("worldRankNode").getChildByName("worldRank").getChildByName("view").getChildByName("content")).height = 120 * e.length : 2 === t && ((a = n.getChildByName("friendRankNode").getChildByName("friendRank").getChildByName("view").getChildByName("content")).height = 120 * e.length);
				for (var i = null, o = 0; o < e.length; o++) {
					var s = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.rankItem);
					s.addComponent("rankItem").init(e[o], o + 1), a.addChild(s), s.y = 120 * -o + 90, 2 === t && e[o].playerID === gameSDK.sdkPlayInfo.playerID && (i = o)
				}
				2 === t && n.getChildByName("friendRankNode").getChildByName("friendRank").getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, 100 * i), .1)
			},
			btn_worldRank: function() {
				this.worldRankNode.active = !0, this.friendRankNode.active = !1, this.worldRankNode.getChildByName("worldRank").getComponent(cc.ScrollView).scrollToTop(), this.friendRankBtn.getChildByName("rankBtn1").active = !1, this.friendRankBtn.getChildByName("rankBtn2").active = !0, this.worldRankBtn.getChildByName("rankBtn1").active = !0, this.worldRankBtn.getChildByName("rankBtn2").active = !1
			},
			btn_friendRank: function() {
				this.worldRankNode.active = !1, this.friendRankNode.active = !0;
				for (var e = 0; e < this.friendRankData.length; e++)
					if (this.friendRankData[e].playerID === gameSDK.sdkPlayInfo.playerID) {
						this.node.getChildByName("rankNode").getChildByName("friendRankNode").getChildByName("friendRank").getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, 100 * e), .1);
						break
					} this.friendRankBtn.getChildByName("rankBtn1").active = !0, this.friendRankBtn.getChildByName("rankBtn2").active = !1, this.worldRankBtn.getChildByName("rankBtn1").active = !1, this.worldRankBtn.getChildByName("rankBtn2").active = !0
			},
			btn_close: function() {
				this.node.destroy()
			},
			btn_share: function() {
				gameSDK.logEventByString("rank_dianji");
				var e = new Object;
				e.pngData = [{
					url: gameSDK.sdkPlayInfo.photo,
					posX: 288,
					posY: 10,
					imgWidth: 175,
					imgHeight: 175
				}, {
					url: cc.url.raw("resources/invbg.png"),
					posX: 0,
					posY: 0,
					imgWidth: 750,
					imgHeight: 380
				}], e.width = 750, e.height = 380, e.text = "Come and play together", e.template = "play_turn", gameSDK.faceBookUpdateAsync.sendFaceBookFriend(e, function() {
					gameSDK.logEventByString("rank_chenggong")
				}, function() {
					gameSDK.logEventByString("rank_shibai")
				}, function() {
					gameSDK.logEventByString("rank_shibai")
				})
			},
			update: function(e) {
				!0 === this.isGetWorldRankData && (this.getWorldRankDataTime += e, this.getWorldRankDataTime >= .1 && (this.createWorldRank(), this.getWorldRankDataTime = 0)), !0 === this.isGetFriendRankData && (this.getFriendRankDataTime += e, this.getFriendRankDataTime >= .1 && (this.createFriendRank(), this.getFriendRankDataTime = 0))
			}
		}), cc._RF.pop()
	}, {}],
	result_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "ee2f70IVoNOTq8XzOi38nG0", "result_view");
		var n = 0,
			a = 0,
			i = 0,
			o = "",
			s = 0;
		cc.Class({
			extends: cc.Component,
			properties: {
				moreGameBtn: null,
				moreGoldBtn: null,
				homeBtn: null,
				continueBtn: null,
				progressBar: null,
				pauseAddExp: 1
			},
			onDestroy: function() {
				this.moreGoldBtn.off(cc.Node.EventType.TOUCH_END, this.clickMoreGoldBtn, this), this.homeBtn.off(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this), this.continueBtn.off(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this), this.moreGoldBtn = null, this.homeBtn = null, this.continueBtn = null, this.moreGameBtn = null
			},
			onLoad: function() {
				this.node.getChildByName("gold").active = !1, this.node.getChildByName("continueBtn").active = !1, this.node.getChildByName("homeBtn").active = !1, heroData.moreGameIndexs = (heroData.moreGameIndexs + 1) % 4
			},
			start: function() {
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.moreGoldBtn = this.node.getChildByName("gold").getChildByName("moreGoldBtn"), this.homeBtn = this.node.getChildByName("homeBtn"), this.continueBtn = this.node.getChildByName("continueBtn"), this.progressBar = this.node.getChildByName("progressbg"), this.moreGoldBtn.on(cc.Node.EventType.TOUCH_END, this.clickMoreGoldBtn, this), this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.clickHomeBtn, this), this.continueBtn.on(cc.Node.EventType.TOUCH_END, this.clickContinueBtn, this), this.node.getChildByName("gold").getChildByName("goldLabel").getComponent(cc.Label).string = "50", gameSDK.faceBookAdvertisement.showInterstitialAD(3, this.initData.bind(this), this.initData.bind(this));
				var t = heroData.getLv(),
					n = gameConfigData.getLvExpInfo(t),
					a = n.exp,
					i = n.name;
				Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead"), "uipng/gradeIcon/" + i);
				var o = ~~((t - 1) / 3);
				o = Math.min(4, o), Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead").getChildByName("gradebg"), "uipng/gradeIcon/gradebg" + o), this.progressBar.getComponent(cc.ProgressBar).progress = heroData.exp / a, this.progressBar.getChildByName("protxt").getComponent(cc.Label).string = heroData.exp + "/" + a, t >= gameConfigData.lvExpInfo.max ? this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(n.languageId, heroData.getLv() - gameConfigData.lvExpInfo.max + 1) : this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(n.languageId, n.languageValue), heroData.taskFinishArr[5] = heroData.taskFinishArr[5] ? ++heroData.taskFinishArr[5] : 1;
				var s = new cc.Node;
				s.scale = .8, s.setPosition(0, 0), this.node.addChild(s)
			},
			initData: function() {
				n = 20, debugTest.setMoreExp && (n = 200), s = .5 / n, a = heroData.getLv(), i = heroData.getExp(), o = gameConfigData.getLvExpInfo(a).name, this.pauseAddExp = 0, this.addExp()
			},
			addExp: function() {
				if (--n < 0) return heroData.setLv(Math.max(1, a)), heroData.setExp(i), this.node.getChildByName("gold").active = !0, this.node.getChildByName("continueBtn").active = !0, this.node.getChildByName("homeBtn").active = !0, MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
					pos: cc.v2(0, -100),
					num: 50
				})), gameSDK.leaderboard.setScoreAsync(fbRankName, heroData.getTotalExp(), heroData.getLv() + "_" + heroData.getExp(), function() {
					gameConfigData.gameRankData.loadGlobalRankDataBySDK(), gameConfigData.gameRankData.loadFriendRankDataBySDK()
				}, function() {}), heroData.saveData(), void(this.addExp = function() {});
				var e = gameConfigData.getLvExpInfo(a),
					t = e.exp;
				++i >= t && (i -= t, a++, o = gameConfigData.getLvExpInfo(a).name, t = (e = gameConfigData.getLvExpInfo(a)).exp, this.showUpgradeIcon()), Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead"), "uipng/gradeIcon/" + o);
				var s = ~~((a - 1) / 3);
				s = Math.min(4, s), Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead").getChildByName("gradebg"), "uipng/gradeIcon/gradebg" + s), this.progressBar.getComponent(cc.ProgressBar).progress = i / t, this.progressBar.getChildByName("protxt").getComponent(cc.Label).string = i + "/" + t, a >= gameConfigData.lvExpInfo.max ? this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(e.languageId, a - gameConfigData.lvExpInfo.max + 1) : this.node.getChildByName("honor").getChildByName("honortxt").getComponent(cc.Label).string = Util.getLanguage(e.languageId, e.languageValue)
			},
			showUpgradeIcon: function() {
				var e = this;
				this.pauseAddExp = 1, this.node.getChildByName("progressbg").active = !1, this.node.getChildByName("honor").x = 0, this.node.getChildByName("honor").scale = 0, Util.setPic(this.node.getChildByName("honor").getChildByName("honorhead"), "uipng/gradeIcon/" + o), this.node.getChildByName("honor").runAction(cc.sequence(cc.scaleTo(.23, 3, 3), cc.scaleTo(.16, 2.6, 2.6), cc.scaleTo(.1, 3, 3), cc.delayTime(1), cc.spawn(cc.moveTo(.3, cc.v2(-219, 92)), cc.scaleTo(.3, 1, 1)), cc.callFunc(function() {
					e.node.getChildByName("progressbg").active = !0, e.pauseAddExp = 0
				})))
			},
			clickMoreGoldBtn: function() {
				var e = this,
					t = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
				gameSDK.faceBookAdvertisement.showRewardVideoAd(t, function() {
					e.node.getChildByName("gold").getChildByName("goldLabel").getComponent(cc.Label).string = "150", e.node.getChildByName("gold").getChildByName("result_arrow").active = !1, e.moreGoldBtn.active = !1, MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
						pos: cc.v2(0, -100),
						num: 150
					})), heroData.saveData()
				})
			},
			clickHomeBtn: function() {
				this.node.destroy(), cc.director.loadScene("MainScene", function() {
					CFG.reset()
				})
			},
			clickContinueBtn: function() {
				CFG.readyOverNpcNum = 0, this.node.destroy(), CFG.reset(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.vs)
			},
			clickMoreGameBtn: function() {
				var e = moreGameInfo[heroData.moreGameIndexs + 1].id;
				gameSDK.goToOtherGame(e)
			},
			update: function(e) {
				(l += e) > .5 && (l = 0, this.node.getChildByName("homeBtn").getChildByName("red").active = heroData.anyTaskCanFinish() || heroData.anySkillCanUpdate()), this.pauseAddExp || (r += e) > s && (r = 0, this.addExp())
			}
		});
		var r = 0,
			l = 0;
		cc._RF.pop()
	}, {}],
	runCircle: [function(e, t) {
		"use strict";
		var n, a, i;
		cc._RF.push(t, "c22daB7VCBPp5QxlUpFKODN", "runCircle"), cc.Class({
			extends: cc.Component,
			properties: {},
			onDestroy: function() {
				n = null, a = null, i = null, this.unscheduleAllCallbacks()
			},
			start: function() {
				this.node.zIndex = -1, (a = this.node.getChildByName("runcircle").getComponent(cc.Sprite)).fillRange = 0, (i = this.node.getChildByName("runcircle_rect")).active = !1
			},
			setData: function(e) {
				n = e
			},
			update: function() {
				n && CFG.myPerson && (this.node.getChildByName("runcircle_arrow").angle = CFG.myPerson.node.angle, a.fillRange = -CFG.myPerson.getComponent(CFG.both_attr).run_force, a.fillRange <= -1 ? i.active || (i.active = !0, i.scale = .9, i.runAction(cc.sequence(cc.scaleTo(.3, 1.15, 1.15), cc.scaleTo(.2, 1, 1)).repeatForever())) : i.active = !1, this.node.position = CFG.myPerson.node.position)
			}
		}), cc._RF.pop()
	}, {}],
	runSmoke: [function(e, t) {
		"use strict";
		cc._RF.push(t, "a084478GGZNroCy1Sfd1KdW", "runSmoke"), cc.Class({
			extends: cc.Component,
			properties: {
				lookAtNode: null,
				oldPos: null
			},
			onDestroy: function() {
				this.lookAtNode = null, this.oldPos = null, this.unscheduleAllCallbacks()
			},
			start: function() {},
			setData: function(e) {
				this.lookAtNode = e
			},
			update: function() {
				if (!CFG.waitForStart && !CFG.showVictory) {
					if (this.lookAtNode) {
						if (this.node.position = this.lookAtNode.position, this.oldPos) {
							var e = this.node.position.sub(this.oldPos).mag();
							this.node.opacity = 255 * e / 15
						}
						this.oldPos = this.node.position
					}
					return this.lookAtNode.getComponent(CFG.both_attr).speed <= Util.getCFGValue(gamePlayCFG.maxRunSpeed, this.lookAtNode.getComponent(CFG.both_attr)) ? (this.node.opacity = 0, void(this.oldPos = null)) : void 0
				}
			}
		}), cc._RF.pop()
	}, {}],
	skill_list: [function(e, t) {
		"use strict";
		cc._RF.push(t, "e53655IpK9D9IbtGr0GC0L7", "skill_list"), cc.Class({
			extends: cc.Component,
			properties: {
				index: 0,
				buy_btn: null,
				price: 0,
				showLevel: 0,
				targetLevel: 0
			},
			onDestroy: function() {
				this.buy_btn.off(cc.Node.EventType.TOUCH_END, this.clickBuyFun, this), this.buy_btn = null
			},
			start: function() {
				this.buy_btn = this.node.getChildByName("buy_btn"), this.buy_btn.on(cc.Node.EventType.TOUCH_END, this.clickBuyFun, this)
			},
			setData: function(e) {
				this.node.position = e.pos, this.index = e.index, this.showLevel = heroData.skillLevelArr[this.index], this.targetLevel = this.showLevel, this.flushStatus()
			},
			flushStatus: function() {
				var e = heroData.skillLevelArr[this.index],
					t = 100 * (this.index + 1) + e,
					n = gameConfigData.skillData[t];
				this.node.getChildByName("nameLabel").getComponent(cc.Label).string = Util.getLanguage([1026, 1029, 1032, 1035, 1038, 1041][this.index]), this.node.getChildByName("desLabel").getComponent(cc.Label).string = Util.getLanguage(n.lang_id, n.lang_value), this.node.getChildByName("pro_txt").getComponent(cc.Label).string = e + "/10", this.node.getChildByName("buy_btn").getChildByName("price").getComponent(cc.Label).string = "x" + n.price, this.price = n.price, 10 == e && (this.node.getChildByName("buy_btn").getChildByName("gold_icon").active = !1, this.node.getChildByName("buy_btn").getChildByName("price").getComponent(cc.Label).string = Util.getLanguage(1044), this.node.getChildByName("buy_btn").getChildByName("price").x = -30)
			},
			clickBuyFun: function() {
				0 != this.price && (heroData.getGold() >= this.price ? (heroData.skillLevelArr[this.index]++, this.targetLevel = heroData.skillLevelArr[this.index], heroData.addGold(-this.price), this.flushStatus()) : MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.buygem))
			},
			update: function(e) {
				this.showLevel += 4 * e, this.showLevel = Math.min(this.targetLevel, this.showLevel), this.node.getChildByName("progress").getComponent(cc.ProgressBar).progress = this.showLevel / 10, 10 == heroData.skillLevelArr[this.index] ? Util.setPic(this.node.getChildByName("buy_btn"), "uipng/skill/skill_btn_yellow") : this.price > heroData.getGold() ? Util.setPic(this.node.getChildByName("buy_btn"), "uipng/skill/skill_btn_gray") : Util.setPic(this.node.getChildByName("buy_btn"), "uipng/skill/skill_btn_green")
			}
		}), cc._RF.pop()
	}, {}],
	skill_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "042ceCwvihKWJaEPWt6cv/N", "skill_view"), cc.Class({
			extends: cc.Component,
			properties: {
				returnBtn: null
			},
			onDestroy: function() {
				this.returnBtn.off(cc.Node.EventType.TOUCH_END, this.clickReturnFun, this), this.returnBtn = null
			},
			onLoad: function() {
				debugTest.arabic_model && (this.node.getChildByName("closeBtn").x = 270);
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.returnBtn = this.node.getChildByName("closeBtn"), this.returnBtn.on(cc.Node.EventType.TOUCH_END, this.clickReturnFun, this);
				for (var t = cc.v2(-123, 287), n = 0; n < 6; n++) e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_skill_list, this.node.getChildByName("lists"), {
					pos: t.add(cc.v2(0, 159.5 * -n)),
					index: n
				}), MyGameEvent.emit(MyGameEvent.createPrefab, e)
			},
			start: function() {},
			clickReturnFun: function() {
				this.node.destroy(), CFG.currentFightScene && (CFG.winTimes--, CFG.winTimes = Math.max(0, CFG.winTimes), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.goal_round))
			}
		}), cc._RF.pop()
	}, {}],
	task_list: [function(e, t) {
		"use strict";
		cc._RF.push(t, "cd8d6B5/XRFPa33INAuLBn0", "task_list"), cc.Class({
			extends: cc.Component,
			properties: {
				getBtn: null,
				taskId: 0,
				award: 0,
				canGetAward: 0
			},
			onDestroy: function() {
				this.getBtn.off(cc.Node.EventType.TOUCH_START, this.clickFlushBtn, this), this.getBtn = null
			},
			onLoad: function() {
				this.getBtn = this.node.getChildByName("enter_greenbtn"), this.getBtn.on(cc.Node.EventType.TOUCH_START, this.clickGetBtn, this)
			},
			setTask: function(e) {
				this.taskId = e, this.flushTaskStatus()
			},
			flushTaskStatus: function() {
				var e = this.taskId,
					t = gameConfigData.taskData[e],
					n = heroData.taskFinishArr[(e - 1) % 10] || 0;
				n = cc.misc.clampf(n, 0, t.count), this.award = t.award, this.node.getChildByName("progress").getComponent(cc.ProgressBar).progress = n / t.count, this.node.getChildByName("pro_label").getComponent(cc.Label).string = n + "/" + t.count, this.node.getChildByName("name_label").getComponent(cc.Label).string = Util.getLanguage(t.lang_id, t.lang_value), this.getBtn.getChildByName("award_label").getComponent(cc.Label).string = t.award + "";
				var a = n == t.count;
				this.getBtn.getComponent(cc.Button).interactable = a, this.getBtn.active = -1 == heroData.taskGetArr.indexOf(e), this.node.getChildByName("task_finish").active = -1 != heroData.taskGetArr.indexOf(e), -1 == heroData.taskGetArr.indexOf(e) && a ? this.canGetAward = 1 : this.canGetAward = 0
			},
			clickGetBtn: function() {
				this.canGetAward && (MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
					pos: this.node.position.add(cc.v2(200, 0)),
					num: this.award
				})), heroData.taskGetArr.push(this.taskId), this.flushTaskStatus())
			}
		}), cc._RF.pop()
	}, {}],
	task_view: [function(e, t) {
		"use strict";
		cc._RF.push(t, "aa70bwruRpAF5z3AVBXULF9", "task_view"), cc.Class({
			extends: cc.Component,
			properties: {
				closeBtn: null,
				flushBtn: null
			},
			onDestroy: function() {
				this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.clickTaskBtn, this), this.flushBtn.off(cc.Node.EventType.TOUCH_END, this.clickFlushBtn, this), this.closeBtn = null
			},
			start: function() {
				var e = GamePrefabConfig.createPrefabInitData(GamePrefabConfig.gold_show_add_ui, this.node);
				MyGameEvent.emit(MyGameEvent.createPrefab, e), this.closeBtn = this.node.getChildByName("closebtn"), this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this), this.flushBtn = this.node.getChildByName("flushBtn"), this.flushBtn.on(cc.Node.EventType.TOUCH_END, this.clickFlushBtn, this);
				for (var t = 0; t < heroData.haveTaskArr.length; t++) this.node.getChildByName("task" + (t + 1)).addComponent("task_list");
				this.showTaskInfo()
			},
			clickCloseBtn: function() {
				this.node.destroy()
			},
			clickFlushBtn: function() {
				var e = videoAdKeyList[parseInt(Math.random() * videoAdKeyList.length)];
				gameSDK.faceBookAdvertisement.showRewardVideoAd(e, function() {
					heroData.flushTask()
				})
			},
			showTaskInfo: function() {
				for (var e = 0; e < heroData.haveTaskArr.length; e++) this.node.getChildByName("task" + (e + 1)).getComponent("task_list").setTask(heroData.haveTaskArr[e])
			},
			update: function(e) {
				var t = (new Date).getTime();
				if ((n += e) > .1) {
					n = 0;
					var a = heroData.taskFlushTime - t;
					this.node.getChildByName("des").getComponent(cc.Label).string = Util.getLanguage(1017, Util.formatTime(a)), this.showTaskInfo()
				}
			}
		});
		var n = 0;
		cc._RF.pop()
	}, {}],
	uprankGetGemLayer: [function(e, t) {
		"use strict";
		cc._RF.push(t, "7902epJjzBPcIphckCWA826", "uprankGetGemLayer"), cc.Class({
			extends: cc.Component,
			properties: {
				closebtn: null,
				watchbtn: null
			},
			onLoad: function() {
				this.closebtn = this.node.getChildByName("closebtn"), this.closebtn.on(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this), this.watchbtn = this.node.getChildByName("watchbtn"), this.watchbtn.on(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this), this.node.getChildByName("gemnum").getComponent(cc.Label).string = "x" + gameConfigData.watchAD_rankup_gem_num, this.node.getChildByName("des").getComponent(cc.Label).string = Util.getLanguage(1010, gameConfigData.watchAD_rankup_gem_num)
			},
			onDestroy: function() {
				this.closebtn.off(cc.Node.EventType.TOUCH_END, this.clickCloseBtn, this), this.watchbtn.off(cc.Node.EventType.TOUCH_END, this.clickWatchBtn, this), this.isInit = null
			},
			clickCloseBtn: function() {
				this.node.destroy(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.result)
			},
			clickWatchBtn: function() {
				var e = this,
					t = videoAdKeyList[~~(Math.random() * videoAdKeyList.length)];
				gameSDK.faceBookAdvertisement.showRewardVideoAd(t, function() {
					MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
						pos: cc.v2(0, 0),
						num: gameConfigData.watchAD_rankup_gem_num
					})), e.clickCloseBtn()
				})
			}
		}), cc._RF.pop()
	}, {}],
	"use_v2.1-2.2.1_cc.Toggle_event": [function(e, t) {
		"use strict";
		cc._RF.push(t, "03b38L82Y5PmYeHjhtNXjy2", "use_v2.1-2.2.1_cc.Toggle_event"), cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0), cc._RF.pop()
	}, {}],
	viewManager: [function(e, t) {
		"use strict";
		cc._RF.push(t, "b2219sthj1NVJVqhSib1ADL", "viewManager"), window.GameViewConfig = {
			messageBox: {
				ui: mustLoadPrefab.msg_view,
				js: "view_msg_box"
			},
			main_view: {
				ui: mustLoadPrefab.main_view,
				pos: [-.5, -.5],
				js: "main_view"
			},
			rank: {
				ui: mustLoadPrefab.rankPrefab,
				pos: [0, 0],
				js: "rankPrefab"
			},
			skinShop: {
				ui: mustLoadPrefab.skinshop_prefab,
				pos: [0, 0],
				js: "SkinShopLayer"
			},
			buygem: {
				ui: mustLoadPrefab.getgem_prefab,
				pos: [0, 0],
				js: "GetGemLayer"
			},
			uprank_buygem: {
				ui: mustLoadPrefab.uprank_getgem_prefab,
				pos: [0, 0],
				js: "uprankGetGemLayer"
			},
			vs: {
				ui: mustLoadPrefab.vs_prefab,
				pos: [0, 0],
				js: "OpenVs"
			},
			tips: {
				ui: mustLoadPrefab.tipsnode_prefab,
				pos: [0, 0],
				js: "TipsLayer"
			},
			loading_ad_prefab: {
				ui: mustLoadPrefab.loading_ad_prefab,
				js: "loading_ad_view"
			},
			skill: {
				ui: mustLoadPrefab.skill_view,
				js: "skill_view"
			},
			ad_certain: {
				ui: mustLoadPrefab.ad_certain,
				js: "ad_certain_view"
			},
			more_game: {
				ui: mustLoadPrefab.moregame_prefab,
				js: "more_game_view"
			},
			getGoldByADs_many_prefab: {
				ui: mustLoadPrefab.getGoldByADs_many_prefab,
				js: "getGoldByADs_many_prefab"
			},
			mul_game_match_prefab: {
				ui: mustLoadPrefab.mul_game_match_prefab,
				js: "mul_game_match_prefab"
			},
			mul_game_prefab: {
				ui: mustLoadPrefab.mul_game_prefab,
				js: "mul_game_prefab"
			},
			mul_game_result_prefab: {
				ui: mustLoadPrefab.mul_game_result_prefab,
				js: "mul_game_result_prefab"
			},
			mul_game_step_win_prefab: {
				ui: mustLoadPrefab.mul_game_result_prefab,
				js: "mul_game_step_win_prefab"
			},
			mul_game_times_up_prefab: {
				ui: mustLoadPrefab.mul_game_times_up_prefab,
				js: "mul_game_times_up_prefab"
			},
			gamemap: {
				ui: mustLoadPrefab.gamemap_prefab,
				js: "gameMap",
				index: "map"
			},
			game_small_map: {
				ui: mustLoadPrefab.small_map_prefab,
				js: "gameSmallMap"
			},
			game_map_door: {
				ui: mustLoadPrefab.gameMap_door_prefab,
				js: "gameMap",
				index: "map_door"
			},
			rankUp: {
				ui: mustLoadPrefab.rankup_prefab,
				pos: [0, 0],
				js: "view_rankUp"
			},
			task: {
				ui: mustLoadPrefab.task_prefab,
				pos: [0, 0],
				js: "task_view"
			},
			goal_round: {
				ui: mustLoadPrefab.goal_round_prefab,
				pos: [0, 0],
				js: "goal_round_view"
			},
			goal_fail: {
				ui: mustLoadPrefab.goal_fail_prefab,
				pos: [0, 0],
				js: "goal_fail_view"
			},
			goal_prefab: {
				ui: mustLoadPrefab.goal_prefab,
				pos: [0, 0],
				js: "goal_view"
			},
			result: {
				ui: mustLoadPrefab.result_prefab,
				pos: [0, 0],
				js: "result_view"
			},
			black_mask: {
				ui: mustLoadPrefab.big_black_mask,
				js: "fight_black_mask"
			}
		};
		var n, a = 0,
			i = !1;
		cc.Class({
			extends: cc.Component,
			properties: {
				minSizeCheckTime: 0,
				endCallFun: null
			},
			onDestroy: function() {
				MyGameEvent.off(MyGameEvent.openView, this.openView, this), MyGameEvent.off(MyGameEvent.flyGoldThenAdd, this.flyGoldThenAdd, this), MyGameEvent.off(MyGameEvent.checkBackLoadEnd, this.checkBackLoadEnd, this)
			},
			start: function() {
				MyGameEvent.on(MyGameEvent.openView, this.openView, this), MyGameEvent.on(MyGameEvent.flyGoldThenAdd, this.flyGoldThenAdd, this), MyGameEvent.on(MyGameEvent.checkBackLoadEnd, this.checkBackLoadEnd, this)
			},
			initEndCall: function(e) {
				this.endCallFun = e
			},
			openView: function(e) {
				cc.log("show view:", e);
				var t = e.ui,
					n = e.js,
					a = e.data || a;
				new Promise(function(e, n) {
					cc.resources.load(t, function(t, a) {
						if (t) return console.error(t), void n();
						e(cc.instantiate(a))
					})
				}).then(function(t) {
					if (cc.log("\u52a0\u8f7d\u5b8c\u6210"), e.index ? cc.find("Canvas/" + e.index).addChild(t, 0) : cc.find("Canvas/views").addChild(t, 0), n) {
						var i = t.addComponent(n);
						a && (i.setData ? i.setData(a) : cc.error("\u672a\u8bbe\u5b9a\u7684data", e))
					}
				}).catch(function(e) {
					cc.error("\u52a0\u8f7d\u5931\u8d25\u4e86", e)
				})
			},
			flyGoldThenAdd: function(e) {
				CFG.showAddGoldEffectValue = e
			},
			checkBackLoadEnd: function(e) {
				i = !0, n = e, 0 != engine.gameBackgroundLoad.loadInfoArr.length && addLoadingCircle()
			},
			update: function(e) {
				this.endCallFun && (this.endCallFun(), this.endCallFun = null), (a += e) > .1 && i && (a = 0, 0 == engine.gameBackgroundLoad.loadInfoArr.length && (removeLoadingCircle(), n && n(), i = !1))
			}
		}), cc._RF.pop()
	}, {}],
	view_msg_box: [function(e, t) {
		"use strict";
		var n;
		cc._RF.push(t, "014a3cM4FRNuJ5M9mWrlOkP", "view_msg_box"), cc.Class({
			extends: cc.Component,
			properties: {
				receiveBtn: null
			},
			onDestroy: function() {
				n.off(cc.Node.EventType.TOUCH_END, this.receiveFun, this), n = null
			},
			onLoad: function() {
				(n = this.node.getChildByName("get_btn")).on(cc.Node.EventType.TOUCH_END, this.receiveFun.bind(this), this)
			},
			receiveFun: function() {
				n.active = !1;
				var e = this;
				this.node.getChildByName("msg_box").getComponent(sp.Skeleton).loop = !1, this.node.getChildByName("msg_box").getComponent(sp.Skeleton).animation = "open", this.node.getChildByName("msg_box").getComponent(sp.Skeleton).setCompleteListener(function() {
					gameSDK.faceBookBot.subscribeBotAsync(function() {
						getBotData().openSubscribeBot = 1, gameSDK.faceBookBot.sendMessengerRobot(function() {}), MyGameEvent.emit(MyGameEvent.createPrefab, GamePrefabConfig.createPrefabInitData(GamePrefabConfig.prefab_gold_fly, cc.find("Canvas/effects"), {
							pos: cc.v2(0, 0),
							num: 150
						})), e.node.destroy()
					}, function() {
						getBotData().openSubscribeBot = 0, gameSDK.faceBookBot.sendMessengerRobot(function() {}), e.node.destroy()
					})
				})
			}
		}), cc._RF.pop()
	}, {}],
	view_rankUp: [function(e, t) {
		"use strict";
		var n, a, i;
		cc._RF.push(t, "4c326YfjONH34UpC+uUZCEj", "view_rankUp"), cc.Class({
			extends: cc.Component,
			properties: {},
			start: function() {
				this.node.getChildByName("btn_continue"), (n = this.node.getChildByName("bg")).on(cc.Node.EventType.TOUCH_END, this.continueToEnd, this), this.node.getChildByName("rankup_light").runAction(cc.rotateBy(3, 360).repeatForever());
				var e = this.node.getChildByName("rankup_self"),
					t = gameConfigData.createHeadNode(gameSDK.sdkPlayInfo.photo, 130);
				e.getChildByName("headMask").addChild(t), e.getChildByName("label_name").getComponent(cc.Label).string = gameSDK.sdkPlayInfo.name;
				var o, s = heroData.getExp();
				0 == s && (s = 20), e.getChildByName("grt_score").getComponent(cc.Label).string = Util.getLanguage(1014) + s, o = gameConfigData.targetPerson && heroData.getTotalExp() >= gameConfigData.targetPerson.score ? gameConfigData.targetPerson : gameConfigData.gameRankData.getRandomFriend();
				var r = Math.floor(heroData.getTotalExp() * (1 - .1 * Math.random() - .05));
				o.score = Math.max(0, r);
				var l = this.node.getChildByName("rankup_other");
				t = gameConfigData.createHeadNode(o.photo, 130, o.type), l.getChildByName("headMask").addChild(t), l.getChildByName("label_name").getComponent(cc.Label).string = o.name;
				var c = s - ~~(3 * Math.random() + 1);
				c = Math.max(1, c), l.getChildByName("grt_score").getComponent(cc.Label).string = Util.getLanguage(1014) + c;
				var h = e.y,
					d = l.y,
					u = cc.sequence(cc.delayTime(.2), cc.scaleTo(.125, 1.3), cc.scaleTo(.125, 1), cc.delayTime(.125), cc.moveTo(4 / 24, cc.v2(-20, d)), cc.scaleTo(.125, 1.03, .95), cc.scaleTo(.125, 1, 1));
				e.runAction(u), u = cc.sequence(cc.delayTime(.4), cc.scaleTo(.125, 1.09, .86), cc.scaleTo(2 / 24, 1, 1), cc.moveTo(.25, cc.v2(20, h))), l.runAction(u), this.node.getChildByName("rankup_rankup").runAction(cc.moveTo(.4, 0, 150)), this.node.getChildByName("btn_continue").getComponent(cc.Label).string = Util.getLanguage(1025), this.node.getChildByName("btn_continue").runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.fadeIn(.4), cc.scaleTo(.5, .8, .8)), cc.spawn(cc.fadeIn(.4), cc.scaleTo(.5, 1.2, 1.2))))), a = this.node.getChildByName("btn_gift_1"), i = this.node.getChildByName("btn_gift_2"), a.on(cc.Node.EventType.TOUCH_END, this.openGift, this), i.on(cc.Node.EventType.TOUCH_END, this.openGift, this), this.randomMove(a), this.randomMove(i)
			},
			randomMove: function(e) {
				var t = this,
					n = cc.v2(300 * (.5 - Math.random()), -284 - 150 * (.5 - Math.random())),
					a = e.position.sub(n).mag() / 30;
				e.runAction(cc.sequence(cc.moveTo(a, n), cc.callFunc(function() {
					t.randomMove(e)
				})))
			},
			openGift: function() {
				this.node.destroy(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.uprank_buygem)
			},
			onDestroy: function() {
				n.off(cc.Node.EventType.TOUCH_END, this.continueToEnd, this), a.off(cc.Node.EventType.TOUCH_END, this.openGift, this), i.off(cc.Node.EventType.TOUCH_END, this.openGift, this), n = null, a = null, i = null
			},
			continueToEnd: function() {
				this.node.destroy(), MyGameEvent.emit(MyGameEvent.openView, GameViewConfig.result)
			}
		}), cc._RF.pop()
	}, {}]
}, {}, ["Engine", "FaceBookAdvertisement", "FaceBookBot", "FaceBookLeaderboard", "FaceBookPayment", "FaceBookSDK", "FaceBookUpdateAsync", "GameAdapterInfo", "GameAnimation", "GameArtWord", "GameCustomImage", "GameEventManager", "GameLanguageLabel", "GameLanguageSprite", "GameListLayer", "GameSound", "GameSoundButton", "GameTime", "GameTool", "GameData", "GameEventConfig", "NumBigUnit", "NumCalculate", "TileMapData", "GameBackgroundLoad", "GameExternalImage", "GameLoadPrefab", "GameLoadPrefabLayer", "GameLoadSpine", "GameLoadSprite", "GameLoadTexture", "GameMemoryManagement", "GameSoundLoad", "LoadControl", "GameLog", "HttpSendData", "FacebookSDKTestData", "LoginFaceBookSDK", "fight_black_mask", "both_attr", "both_skin", "kickEffect", "npcDir", "npcSpeed", "npc_ai", "npc_person", "myPlayer", "playerDir", "playerSpeed", "runCircle", "runSmoke", "gameBall", "gameBallOutCamera", "gameGuide", "gameMap", "gameScheduleManager", "gameSmallMap", "Game", "GameGlobal", "Resource", "black_mask_run", "close_to_canvas_left_or_right", "GamePlayPool", "GameConfigData", "GameRankData", "HeroData", "prefabManager", "GetGemLayer", "OpenVs", "ad_certain_view", "getGoldByADs_many_prefab", "goal_fail_view", "goal_round_view", "goal_view", "gold_fly", "gold_show_add_ui", "loading_ad_view", "main_view", "more_game_view", "moregame_item_prefab", "mul_game_match_prefab", "mul_game_personHead", "mul_game_prefab", "mul_game_result_prefab", "mul_game_step_win_prefab", "mul_game_times_up_prefab", "rankItem", "rankPrefab", "result_view", "SkinShopItem", "SkinShopLayer", "skill_list", "skill_view", "task_list", "task_view", "uprankGetGemLayer", "view_rankUp", "LittleRank", "TipsLayer", "view_msg_box", "viewManager", "use_v2.1-2.2.1_cc.Toggle_event", "FightSceneControl", "LoginSceneControl", "MainSceneControl"]);