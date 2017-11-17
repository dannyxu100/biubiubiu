/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "df92fbdb87dd978c585c"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/dist";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(31)(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Vue // late bind
var version
var map = window.__VUE_HOT_MAP__ = Object.create(null)
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) return
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
      'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Vue.extend(options),
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  injectHook(options, initHookName, function () {
    map[id].instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    var instances = map[id].instances
    instances.splice(instances.indexOf(this), 1)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

function tryWrap (fn) {
  return function (id, arg) {
    try { fn(id, arg) } catch (e) {
      console.error(e)
      console.warn('Something went wrong during Vue component hot-reload. Full reload required.')
    }
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  record.Ctor.options.render = options.render
  record.Ctor.options.staticRenderFns = options.staticRenderFns
  record.instances.slice().forEach(function (instance) {
    instance.$options.render = options.render
    instance.$options.staticRenderFns = options.staticRenderFns
    instance._staticTrees = [] // reset static trees
    instance.$forceUpdate()
  })
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (version[1] < 2) {
      // preserve pre 2.2 behavior for global mixin handling
      record.Ctor.extendOptions = options
    }
    var newCtor = record.Ctor.super.extend(options)
    record.Ctor.options = newCtor.options
    record.Ctor.cid = newCtor.cid
    record.Ctor.prototype = newCtor.prototype
    if (newCtor.release) {
      // temporary global mixin strategy used in < 2.0.0-alpha.6
      newCtor.release()
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn('Root or manually mounted instance modified. Full reload required.')
    }
  })
})


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.4.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "development" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "development" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  "development" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if ("development" !== 'production' && !source) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.2';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\"/>";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el, state) || 'void 0'
      : genElement(el, state)) + "}}"
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(47);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "/*normalize.css v4.2.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Restore the font weight unset by the previous rule.\n */\noptgroup {\n  font-weight: bold;\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\n/************************** 通用动画相关 **************************/\n.fade-enter-active {\n  -webkit-animation: fade-show 0.3s linear;\n  -moz-animation: fade-show 0.3s linear;\n  -ms-animation: fade-show 0.3s linear;\n  -o-animation: fade-show 0.3s linear;\n  animation: fade-show 0.3s linear;\n}\n.fade-leave-active {\n  -webkit-animation: fade-hide 0.3s linear;\n  -moz-animation: fade-hide 0.3s linear;\n  -ms-animation: fade-hide 0.3s linear;\n  -o-animation: fade-hide 0.3s linear;\n  animation: fade-hide 0.3s linear;\n}\n@-webkit-keyframes fade-show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-moz-keyframes fade-show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-ms-keyframes fade-show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-o-keyframes fade-show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fade-show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fade-hide {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-moz-keyframes fade-hide {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-ms-keyframes fade-hide {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-o-keyframes fade-hide {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fade-hide {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.slide-enter-active {\n  -webkit-transform-origin: left top;\n  -moz-transform-origin: left top;\n  -o-transform-origin: left top;\n  -ms-transform-origin: left top;\n  transform-origin: left top;\n  -webkit-animation: slide-down 0.15s linear;\n  -moz-animation: slide-down 0.15s linear;\n  -ms-animation: slide-down 0.15s linear;\n  -o-animation: slide-down 0.15s linear;\n  animation: slide-down 0.15s linear;\n}\n.slide-leave-active {\n  -webkit-transform-origin: left top;\n  -moz-transform-origin: left top;\n  -o-transform-origin: left top;\n  -ms-transform-origin: left top;\n  transform-origin: left top;\n  -webkit-animation: slide-up 0.15s linear;\n  -moz-animation: slide-up 0.15s linear;\n  -ms-animation: slide-up 0.15s linear;\n  -o-animation: slide-up 0.15s linear;\n  animation: slide-up 0.15s linear;\n}\n@-webkit-keyframes slide-down {\n  0% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n}\n@-moz-keyframes slide-down {\n  0% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n}\n@-ms-keyframes slide-down {\n  0% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n}\n@-o-keyframes slide-down {\n  0% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n}\n@keyframes slide-down {\n  0% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n}\n@-webkit-keyframes slide-up {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n  100% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n}\n@-moz-keyframes slide-up {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n  100% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n}\n@-ms-keyframes slide-up {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n  100% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n}\n@-o-keyframes slide-up {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n  100% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n}\n@keyframes slide-up {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    transform: scale(1, 1);\n  }\n  100% {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    transform: scale(1, 0);\n  }\n}\n.imodal-enter {\n  -webkit-animation: margin-in 0.3s ease-out;\n  -moz-animation: margin-in 0.3s ease-out;\n  -ms-animation: margin-in 0.3s ease-out;\n  -o-animation: margin-in 0.3s ease-out;\n  animation: margin-in 0.3s ease-out;\n}\n.imodal-leave {\n  -webkit-animation: margin-out 0.3s ease-out;\n  -moz-animation: margin-out 0.3s ease-out;\n  -ms-animation: margin-out 0.3s ease-out;\n  -o-animation: margin-out 0.3s ease-out;\n  animation: margin-out 0.3s ease-out;\n}\n@-webkit-keyframes margin-in {\n  0% {\n    margin-top: -1000px;\n  }\n  100% {\n    margin-top: 0;\n  }\n}\n@-moz-keyframes margin-in {\n  0% {\n    margin-top: -1000px;\n  }\n  100% {\n    margin-top: 0;\n  }\n}\n@-ms-keyframes margin-in {\n  0% {\n    margin-top: -1000px;\n  }\n  100% {\n    margin-top: 0;\n  }\n}\n@-o-keyframes margin-in {\n  0% {\n    margin-top: -1000px;\n  }\n  100% {\n    margin-top: 0;\n  }\n}\n@keyframes margin-in {\n  0% {\n    margin-top: -1000px;\n  }\n  100% {\n    margin-top: 0;\n  }\n}\n@-webkit-keyframes margin-out {\n  0% {\n    margin-top: 0;\n  }\n  100% {\n    margin-top: -1000px;\n  }\n}\n@-moz-keyframes margin-out {\n  0% {\n    margin-top: 0;\n  }\n  100% {\n    margin-top: -1000px;\n  }\n}\n@-ms-keyframes margin-out {\n  0% {\n    margin-top: 0;\n  }\n  100% {\n    margin-top: -1000px;\n  }\n}\n@-o-keyframes margin-out {\n  0% {\n    margin-top: 0;\n  }\n  100% {\n    margin-top: -1000px;\n  }\n}\n@keyframes margin-out {\n  0% {\n    margin-top: 0;\n  }\n  100% {\n    margin-top: -1000px;\n  }\n}\n.floatpad-transition {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.floatpad-enter {\n  -webkit-animation: right-in 0.3s ease-out;\n  -moz-animation: right-in 0.3s ease-out;\n  -ms-animation: right-in 0.3s ease-out;\n  -o-animation: right-in 0.3s ease-out;\n  animation: right-in 0.3s ease-out;\n}\n.floatpad-leave {\n  -webkit-animation: right-out 0.3s ease-in;\n  -moz-animation: right-out 0.3s ease-in;\n  -ms-animation: right-out 0.3s ease-in;\n  -o-animation: right-out 0.3s ease-in;\n  animation: right-out 0.3s ease-in;\n}\n@-webkit-keyframes right-in {\n  0% {\n    margin-right: -1000px;\n  }\n  100% {\n    margin-right: 0;\n  }\n}\n@-moz-keyframes right-in {\n  0% {\n    margin-right: -1000px;\n  }\n  100% {\n    margin-right: 0;\n  }\n}\n@-ms-keyframes right-in {\n  0% {\n    margin-right: -1000px;\n  }\n  100% {\n    margin-right: 0;\n  }\n}\n@-o-keyframes right-in {\n  0% {\n    margin-right: -1000px;\n  }\n  100% {\n    margin-right: 0;\n  }\n}\n@keyframes right-in {\n  0% {\n    margin-right: -1000px;\n  }\n  100% {\n    margin-right: 0;\n  }\n}\n@-webkit-keyframes right-out {\n  0% {\n    margin-right: 0;\n  }\n  100% {\n    margin-right: -1000px;\n  }\n}\n@-moz-keyframes right-out {\n  0% {\n    margin-right: 0;\n  }\n  100% {\n    margin-right: -1000px;\n  }\n}\n@-ms-keyframes right-out {\n  0% {\n    margin-right: 0;\n  }\n  100% {\n    margin-right: -1000px;\n  }\n}\n@-o-keyframes right-out {\n  0% {\n    margin-right: 0;\n  }\n  100% {\n    margin-right: -1000px;\n  }\n}\n@keyframes right-out {\n  0% {\n    margin-right: 0;\n  }\n  100% {\n    margin-right: -1000px;\n  }\n}\n/************************* placeholder ************************/\n::-webkit-input-placeholder {\n  /* WebKit browsers */\n  color: #aaa;\n  font-size: 14px;\n}\n:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #aaa;\n  font-size: 14px;\n  opacity: 1;\n}\n::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #aaa;\n  font-size: 14px;\n  opacity: 1;\n}\n:-ms-input-placeholder {\n  /* Internet Explorer 10+ */\n  color: #aaa;\n  font-size: 14px;\n}\ninput::-webkit-input-placeholder,\ntextarea::-webkit-input-placeholder {\n  /* WebKit browsers */\n  color: #aaa;\n  font-size: 14px;\n}\ninput:-moz-placeholder,\ntextarea:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #aaa;\n  font-size: 14px;\n  opacity: 1;\n}\ninput::-moz-placeholder,\ntextarea::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #aaa;\n  font-size: 14px;\n  opacity: 1;\n}\ninput:-ms-input-placeholder,\ntextarea:-ms-input-placeholder {\n  /* Internet Explorer 10+ */\n  color: #aaa;\n  font-size: 14px;\n}\n/************************** 常用公共 **************************/\n.wrapper {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\n.wrapper-scroll {\n  overflow-y: auto;\n}\n.wrapper-box {\n  padding: 20px;\n}\n.wrapper-white {\n  background-color: #fff;\n  color: #333;\n}\n.vueapp {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding-left: 240px;\n  overflow: hidden;\n  background: -webkit-linear-gradient(225deg, #1bb3eb, #40f1d1);\n  background: -moz-linear-gradient(225deg, #1bb3eb, #40f1d1);\n  background: -o-linear-gradient(225deg, #1bb3eb, #40f1d1);\n  background: linear-gradient(225deg, #1bb3eb, #40f1d1);\n}\n.vueapp > .wrapper {\n  left: 260px;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-transition: left ease-out 0.3s;\n  -ms-transition: left ease-out 0.3s;\n  -moz-transition: left ease-out 0.3s;\n  transition: left ease-out 0.3s;\n}\n.vueapp.small {\n  padding-left: 60px;\n}\n.vueapp.small > .wrapper {\n  left: 80px;\n}\n.topbar {\n  height: 50px;\n}\n.leftbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 240px;\n  background: rgba(240, 245, 255, 0.9);\n  -webkit-box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.2);\n}\n.leftbar.small {\n  width: 60px;\n  background: rgba(240, 245, 255, 0.2);\n  -webkit-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);\n  -ms-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);\n}\n.leftbar-enter-active {\n  left: -240px;\n  -webkit-animation: leftbar 0.3s ease-out 0.3s;\n  -moz-animation: leftbar 0.3s ease-out 0.3s;\n  -ms-animation: leftbar 0.3s ease-out 0.3s;\n  -o-animation: leftbar 0.3s ease-out 0.3s;\n  animation: leftbar 0.3s ease-out 0.3s;\n}\n.leftbar-leave-active {\n  -webkit-animation: leftbar 0.3s ease-out reverse;\n  -moz-animation: leftbar 0.3s ease-out reverse;\n  -ms-animation: leftbar 0.3s ease-out reverse;\n  -o-animation: leftbar 0.3s ease-out reverse;\n  animation: leftbar 0.3s ease-out reverse;\n}\n@-webkit-keyframes leftbar {\n  0% {\n    left: -240px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-moz-keyframes leftbar {\n  0% {\n    left: -240px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-ms-keyframes leftbar {\n  0% {\n    left: -240px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-o-keyframes leftbar {\n  0% {\n    left: -240px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@keyframes leftbar {\n  0% {\n    left: -240px;\n  }\n  100% {\n    left: 0;\n  }\n}\n.leftbarsmall-enter-active {\n  left: -60px;\n  -webkit-animation: leftbarsmall 0.3s ease-out 0.3s;\n  -moz-animation: leftbarsmall 0.3s ease-out 0.3s;\n  -ms-animation: leftbarsmall 0.3s ease-out 0.3s;\n  -o-animation: leftbarsmall 0.3s ease-out 0.3s;\n  animation: leftbarsmall 0.3s ease-out 0.3s;\n}\n.leftbarsmall-leave-active {\n  -webkit-animation: leftbarsmall 0.3s ease-out reverse;\n  -moz-animation: leftbarsmall 0.3s ease-out reverse;\n  -ms-animation: leftbarsmall 0.3s ease-out reverse;\n  -o-animation: leftbarsmall 0.3s ease-out reverse;\n  animation: leftbarsmall 0.3s ease-out reverse;\n}\n@-webkit-keyframes leftbarsmall {\n  0% {\n    left: -60px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-moz-keyframes leftbarsmall {\n  0% {\n    left: -60px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-ms-keyframes leftbarsmall {\n  0% {\n    left: -60px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@-o-keyframes leftbarsmall {\n  0% {\n    left: -60px;\n  }\n  100% {\n    left: 0;\n  }\n}\n@keyframes leftbarsmall {\n  0% {\n    left: -60px;\n  }\n  100% {\n    left: 0;\n  }\n}\n.adminpage {\n  color: #fff;\n}\n.adminpage .topbar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50px;\n  background: rgba(255, 255, 255, 0.2);\n}\n.adminpage .content {\n  position: absolute;\n  top: 50px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.1);\n}\n/************************** Prime demo **************************/\n/*!\n * prime v1.0.1 (https://github.com/dannyxu100/prime)\n * 版权所有 danny.xu\n */\n.wrapper-theme {\n  color: #333;\n  background: #ffffff;\n}\n.wrapper-theme .container {\n  width: 100%;\n  max-width: 1200px;\n}\nh1 {\n  font-size: 60px;\n}\n.section {\n  background: #fff;\n  padding: 20px;\n  margin-bottom: 30px;\n}\n.colorblock,\n.colorblock-min {\n  position: relative;\n  z-index: 1;\n  width: 100%;\n  height: 100px;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 20px 0px;\n  text-align: center;\n  border: 0px;\n  -webkit-transition: all linear 0.125s;\n  -ms-transition: all linear 0.125s;\n  -moz-transition: all linear 0.125s;\n  transition: all linear 0.125s;\n}\n.colorblock.active {\n  border-bottom: 2px solid #A22613;\n}\n.colorblock-min {\n  height: 0px;\n  padding: 0px;\n  border: 15px solid #fff;\n  border-width: 15px 0 0;\n}\n.colorblock:not(.empty):hover,\n.colorblock-min:not(.empty):hover {\n  z-index: 2;\n  -webkit-box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.125);\n  -ms-box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.125);\n  -moz-box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.125);\n  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.125);\n}\n.fillblock {\n  width: 100%;\n  font-size: 12px;\n  color: #666;\n  background: #eee;\n  border: 1px solid transparent;\n  padding: 5px 0px;\n  -webkit-transition: all linear 0.125s;\n  -ms-transition: all linear 0.125s;\n  -moz-transition: all linear 0.125s;\n  transition: all linear 0.125s;\n}\n.fillblock:hover {\n  border-color: #ddd;\n  background: #f5f5f5;\n  -webkit-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);\n  -ms-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);\n  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);\n}\n.fillblock:focus {\n  outline: none;\n}\n.rdsbox,\n.rdsboxp {\n  width: 80px;\n  height: 80px;\n  line-height: 80px;\n  background: #ddd;\n  border: 1px solid #ccc;\n  margin: 5px;\n  font-size: 12px;\n  text-align: center;\n}\n.rdsboxp {\n  background: #F5F5F5;\n  border: 1px solid #999;\n}\n.textbox5 {\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n.textbox10 {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.bgimg-light {\n  background: center url(/vue/images/prime/bg-1.png);\n}\n.bgimg-dark {\n  background: center url(/vue/images/prime/bg-2.png);\n}\n.bgimg-gray {\n  background: center url(/vue/images/prime/bg-3.png);\n}\n.demo-popmenuopen {\n  position: relative;\n  height: 260px;\n}\n.demo-popmenuopen > .popmenu {\n  display: block;\n}\n.demo-dlg {\n  position: relative;\n  height: 400px;\n}\n.demo-dlg .dlg {\n  position: absolute;\n}\n.demo-iconfont .iconfont,\n.demo-iconfont-sys .iconfont {\n  font-size: 26px;\n  margin: 20px;\n  color: #319DBB;\n  cursor: pointer;\n}\n.demo-iconfont .iconfont:hover {\n  color: #05C3F9;\n}\n.demo-iconfont-sys .iconfont {\n  color: #A22613;\n}\n.demo-iconfont-sys .iconfont:hover {\n  color: #F95339;\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.navbar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50px;\n  background: rgba(255, 255, 255, 0.2);\n  font-size: 0;\n}\n.navbar .nav {\n  display: inline-block;\n  padding: 0 20px;\n  height: 50px;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 50px;\n  color: #bcfff8;\n  cursor: pointer;\n  text-decoration: none;\n  -webkit-transition: all linear 0.2s;\n  -ms-transition: all linear 0.2s;\n  -moz-transition: all linear 0.2s;\n  transition: all linear 0.2s;\n}\n.navbar .nav:hover {\n  color: #ffffff;\n  background: rgba(255, 255, 255, 0.2);\n}\n.navbar .nav.active {\n  color: #00a9b4;\n  background: #ffffff;\n  cursor: default;\n}\n.navbar .nav.home {\n  padding: 0 16px;\n}\n.navbar .nav.home .iconfont {\n  font-size: 16px;\n  font-weight: 400;\n  vertical-align: middle;\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.leftpad .avatarbox {\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 220px;\n  background-image: url(/public/images/bg-star.png);\n}\n.leftpad .avatarbox:after {\n  content: \"\";\n  opacity: .9;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: -webkit-linear-gradient(25deg, #00d0ff, #00ffc4);\n  background: -moz-linear-gradient(25deg, #00d0ff, #00ffc4);\n  background: -o-linear-gradient(25deg, #00d0ff, #00ffc4);\n  background: linear-gradient(25deg, #00d0ff, #00ffc4);\n}\n.leftpad .avatarbox .avatarbox-content {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.leftpad .avatarbox .avatarbox-content .btn-toggle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: block;\n  padding: 0;\n  width: 50px;\n  height: 50px;\n  border: none;\n  cursor: pointer;\n  outline: none;\n  background: rgba(255, 255, 255, 0);\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpad .avatarbox .avatarbox-content .btn-toggle:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n.leftpad .avatarbox .avatarbox-content .btn-toggle i {\n  display: inline-block;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  font-size: 22px;\n  color: #fff;\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpad .avatarbox .avatarbox-content .btn-toggle i.active {\n  -webkit-transform: rotate(0deg);\n  -moz-transform: rotate(0deg);\n  -o-transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  transform: rotate(0deg);\n}\n.leftpad .avatarbox .avatarbox-content .avatar-image {\n  position: relative;\n  top: 0;\n  margin: 60px auto 0;\n  width: 64px;\n  height: 64px;\n  background-color: rgba(255, 255, 255, 0.9);\n  background-repeat: no-repeat;\n  background-size: cover;\n  -moz-border-radius: 50px;\n  -webkit-border-radius: 50px;\n  border-radius: 50px;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpad .avatarbox .avatarbox-content .avatar-image:hover {\n  top: -2px;\n  -webkit-box-shadow: 3px 10px 30px 3px #66ffe9;\n  -ms-box-shadow: 3px 10px 30px 3px #66ffe9;\n  -moz-box-shadow: 3px 10px 30px 3px #66ffe9;\n  box-shadow: 3px 10px 30px 3px #66ffe9;\n}\n.leftpad .avatarbox .avatarbox-content .avatar-name {\n  margin: 10px auto 0;\n  width: 160px;\n  text-align: center;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 700;\n  -moz-border-radius: 12px;\n  -webkit-border-radius: 12px;\n  border-radius: 12px;\n}\n.leftpad .avatarbox .avatarbox-content .avatar-remark {\n  margin: 3px auto 0;\n  width: 160px;\n  text-align: center;\n  color: #90ffe3;\n  font-size: 13px;\n}\n.leftpad .menusbox {\n  position: absolute;\n  top: 220px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.leftpad .menusbox .menus-group .groupname {\n  margin: 25px 20px 0;\n  font-size: 12px;\n  color: #00445a;\n}\n.leftpad .menusbox .menus-group .menu .name {\n  position: relative;\n  display: block;\n  padding: 13px 20px;\n  font-size: 15px;\n  color: #3c7a91;\n  cursor: pointer;\n  text-decoration: none;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpad .menusbox .menus-group .menu .name:hover,\n.leftpad .menusbox .menus-group .menu .name.active {\n  color: #134a5e;\n}\n.leftpad .menusbox .menus-group .menu .name i {\n  margin-right: 10px;\n  font-size: 16px;\n}\n.leftpad .menusbox .menus-group .menu .child {\n  padding-left: 40px;\n  padding-bottom: 20px;\n}\n.leftpad .menusbox .menus-group .menu.haschild .name {\n  padding: 4px 20px;\n}\n.leftpad .menusbox .menus-group .menu.haschild > .name {\n  padding: 13px 20px;\n}\n.leftpad .menusbox .menus-group .menu.haschild > .name:after {\n  position: absolute;\n  top: 0;\n  right: 20px;\n  bottom: 0;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  text-align: center;\n  color: #6a94a4;\n  font-family: \"iconfont\" !important;\n  font-size: 20px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  content: \"\\E64D\";\n}\n.leftpad .menusbox .menus-group .menu.haschild > .name.active:after {\n  color: #134a5e;\n}\n.leftpad .menusbox .menus-group > .menu {\n  border-bottom: 1px solid #bee2e7;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.leftpadsmall {\n  overflow: visible;\n}\n.leftpadsmall .btn-toggle {\n  display: block;\n  width: 100%;\n  height: 50px;\n  padding: 0;\n  border: none;\n  background: rgba(255, 255, 255, 0.2);\n  cursor: pointer;\n  outline: none;\n  color: #fff;\n  font-size: 24px;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpadsmall .btn-toggle:hover {\n  background: rgba(255, 255, 255, 0.4);\n}\n.leftpadsmall .btn-toggle i {\n  display: inline-block;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  font-size: 22px;\n  color: #fff;\n  -webkit-transform: rotate(0deg);\n  -moz-transform: rotate(0deg);\n  -o-transform: rotate(0deg);\n  -ms-transform: rotate(0deg);\n  transform: rotate(0deg);\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpadsmall .btn-toggle i.active {\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.leftpadsmall .appsbar {\n  margin: 0;\n  padding: 0;\n}\n.leftpadsmall .appsbar .appsbar-item {\n  position: relative;\n  left: 0;\n  margin: 10px auto;\n  width: 40px;\n  height: 40px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  background-color: #ffffff;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 40px 40px;\n  cursor: pointer;\n  list-style: none;\n  -moz-border-radius: 9px;\n  -webkit-border-radius: 9px;\n  border-radius: 9px;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpadsmall .appsbar .appsbar-item .tip {\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: 7px;\n  left: 45px;\n  width: 0;\n  overflow: hidden;\n  height: 26px;\n  line-height: 26px;\n  white-space: nowrap;\n  font-size: 13px;\n  color: #ffffff;\n  background: rgba(0, 132, 176, 0.9);\n  -moz-border-radius: 13px;\n  -webkit-border-radius: 13px;\n  border-radius: 13px;\n  background: -webkit-linear-gradient(25deg, rgba(0, 79, 147, 0.8), rgba(0, 166, 124, 0.9));\n  background: -moz-linear-gradient(25deg, rgba(0, 79, 147, 0.8), rgba(0, 166, 124, 0.9));\n  background: -o-linear-gradient(25deg, rgba(0, 79, 147, 0.8), rgba(0, 166, 124, 0.9));\n  background: linear-gradient(25deg, rgba(0, 79, 147, 0.8), rgba(0, 166, 124, 0.9));\n  -webkit-box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  -ms-box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  -moz-box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.leftpadsmall .appsbar .appsbar-item:hover {\n  left: 2px;\n  background-color: #ffffff;\n  -webkit-box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n  -ms-box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n  -moz-box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n  box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n}\n.leftpadsmall .appsbar .appsbar-item:hover .tip {\n  opacity: 1;\n  width: auto;\n  padding: 0 20px;\n}\n.leftpadsmall .appsbar-split {\n  margin: 10px auto;\n  width: 40px;\n  border-top: 1px solid rgba(255, 255, 255, 0.3);\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.apps-container {\n  margin: 20px;\n}\n.apps-container .apps-group {\n  padding: 20px 0 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n  font-size: 0;\n}\n.apps-container .apps-group .apps-item {\n  position: relative;\n  top: 0;\n  display: inline-block;\n  font-size: 14px;\n  margin-right: 20px;\n  margin-bottom: 20px;\n  text-decoration: none;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.apps-container .apps-group .apps-item .ico {\n  display: block;\n  margin: 0 auto 10px;\n  width: 58px;\n  height: 58px;\n  background-color: #ffffff;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 58px 58px;\n  -moz-border-radius: 9px;\n  -webkit-border-radius: 9px;\n  border-radius: 9px;\n  -webkit-box-shadow: 0 3px 5px 0 rgba(19, 74, 94, 0.1);\n  -ms-box-shadow: 0 3px 5px 0 rgba(19, 74, 94, 0.1);\n  -moz-box-shadow: 0 3px 5px 0 rgba(19, 74, 94, 0.1);\n  box-shadow: 0 3px 5px 0 rgba(19, 74, 94, 0.1);\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.apps-container .apps-group .apps-item .tit {\n  display: block;\n  position: relative;\n  z-index: 2;\n  width: 96px;\n  height: 26px;\n  line-height: 28px;\n  color: #1ab6ab;\n  font-size: 13px;\n  text-align: center;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.apps-container .apps-group .apps-item:after {\n  opacity: 0;\n  content: \"\";\n  display: block;\n  position: absolute;\n  z-index: 1;\n  top: 70px;\n  left: 48px;\n  bottom: 0;\n  right: 0;\n  width: 0;\n  -moz-border-radius: 13px;\n  -webkit-border-radius: 13px;\n  border-radius: 13px;\n  background: -webkit-linear-gradient(25deg, rgba(0, 79, 147, 0.7), rgba(0, 166, 124, 0.8));\n  background: -moz-linear-gradient(25deg, rgba(0, 79, 147, 0.7), rgba(0, 166, 124, 0.8));\n  background: -o-linear-gradient(25deg, rgba(0, 79, 147, 0.7), rgba(0, 166, 124, 0.8));\n  background: linear-gradient(25deg, rgba(0, 79, 147, 0.7), rgba(0, 166, 124, 0.8));\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.apps-container .apps-group .apps-item:hover {\n  top: -2px;\n}\n.apps-container .apps-group .apps-item:hover .ico {\n  background-color: #ffffff;\n  -webkit-box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n  -ms-box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n  -moz-box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n  box-shadow: 0 3px 30px 5px rgba(255, 255, 255, 0.5);\n}\n.apps-container .apps-group .apps-item:hover .tit {\n  color: #ffffff;\n}\n.apps-container .apps-group .apps-item:hover:after {\n  opacity: 1;\n  width: 96px;\n  left: 0;\n  -webkit-box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  -ms-box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  -moz-box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n  box-shadow: 0 5px 10px 3px rgba(0, 166, 124, 0.3);\n}\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.toolsbar {\n  position: relative;\n  display: inline-table;\n  width: 100%;\n  margin-bottom: 20px;\n  font-size: 0;\n}\n.toolsbar .toolsbar-left,\n.toolsbar .toolsbar-middle,\n.toolsbar .toolsbar-right {\n  display: table-cell;\n  vertical-align: top;\n}\n.toolsbar .toolsbar-left {\n  text-align: left;\n  width: 33%;\n}\n.toolsbar .toolsbar-middle {\n  text-align: center;\n}\n.toolsbar .toolsbar-right {\n  text-align: right;\n  width: 33%;\n}\n.toolsbar .tool-item {\n  display: inline-block;\n  margin: 2px;\n  padding: 6px 20px;\n  border: none;\n  background: rgba(255, 255, 255, 0.4);\n  border-radius: 5px;\n  font-size: 14px;\n  color: #2d9293;\n  cursor: pointer;\n  outline: none;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.toolsbar .tool-item:hover {\n  background: rgba(255, 255, 255, 0.8);\n  color: #009899;\n  -webkit-box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.05);\n  -ms-box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.05);\n}\n.toolsbar .tool-group {\n  display: inline-block;\n  border-radius: 5px;\n  overflow: hidden;\n  margin: 2px;\n}\n.toolsbar .tool-group:first-child {\n  margin-left: 0;\n}\n.toolsbar .tool-group .tool-item {\n  margin: 0;\n  border-left: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0;\n  white-space: nowrap;\n}\n.toolsbar .tool-group .tool-item:first-child {\n  border: none;\n}\n.grid table {\n  width: 100%;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  border-left: 1px solid rgba(255, 255, 255, 0.1);\n  border-collapse: collapse;\n}\n.grid table tr {\n  color: #d3fbff;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.grid table tbody tr:hover {\n  color: #ffffff;\n  background: rgba(0, 0, 0, 0.7);\n}\n.grid table th,\n.grid table td {\n  padding: 10px 15px;\n  font-size: 14px;\n  border-right: 1px solid rgba(255, 255, 255, 0.1);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.grid table th {\n  text-align: left;\n  font-size: 13px;\n  font-weight: 400;\n  color: #54c4c1;\n}\n.grid.grid-line {\n  border-left: none;\n}\n.grid.grid-line th,\n.grid.grid-line td {\n  border-right: none;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.wrapper {\n  background-repeat: no-repeat;\n}\n.homepage {\n  color: #fff;\n}\n.homepage .topnavs {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50px;\n  background: rgba(255, 255, 255, 0.2);\n  font-size: 0;\n}\n.homepage .topnavs .nav {\n  display: inline-block;\n  padding: 0 20px;\n  height: 50px;\n  font-size: 15px;\n  line-height: 50px;\n  color: #fff;\n  cursor: pointer;\n  -webkit-transition: all linear 0.15s;\n  -ms-transition: all linear 0.15s;\n  -moz-transition: all linear 0.15s;\n  transition: all linear 0.15s;\n}\n.homepage .topnavs .nav:hover {\n  background: rgba(255, 255, 255, 0.2);\n}\n.homepage .topnavs .nav.active {\n  color: #37e3d6;\n  background: #ffffff;\n  cursor: default;\n}\n.homepage .topnavs .nav.home {\n  padding: 0 16px;\n  color: #b6fffb;\n  cursor: pointer;\n}\n.homepage .topnavs .nav.home:hover {\n  color: #fff;\n}\n.homepage .content {\n  position: absolute;\n  top: 50px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.1);\n}\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
  * vue-router v2.7.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("undefined" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "undefined" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("undefined" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (true) {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef.default) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "undefined" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "undefined" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	MERGE_DATA: 'MERGE_DATA'
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(46);
module.exports = __webpack_require__(48);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

const hotClient         = __webpack_require__(33);
// 订阅事件，当 event.action === 'reload' 时执行页面刷新
// app.js中 派发的reload事件吧
hotClient.subscribe(function (event) {
    if ('reload' === event.action) {
        window.location.reload();
    }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: "/__webpack_hmr",
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true
};
if (true) {
  var querystring = __webpack_require__(35);
  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
    "You should include a polyfill if you want to support this browser: " +
    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if ((new Date() - lastActivity) > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log("[HMR] connected");
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    }
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == "\uD83D\uDC93") {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(38);

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(40);
  }

  var styles = {
    errors: "color: #ff0000;",
    warnings: "color: #999933;"
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : "";
    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group("%c" + title, style);
      console.log("%c" + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
        style + "font-weight: bold;",
        style + "font-weight: normal;"
      );
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    }
  };
}

var processUpdate = __webpack_require__(45);

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch(obj.action) {
    case "building":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilding"
        );
      }
      break;
    case "built":
      if (options.log) {
        console.log(
          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
          "rebuilt in " + obj.time + "ms"
        );
      }
      // fall through
    case "sync":
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
      } else {
        if (reporter) {
          if (obj.warnings.length > 0) {
            reporter.problems('warnings', obj);
          } else {
            reporter.cleanProblemsCache();
          }
          reporter.success();
        }
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect
  };
}

/* WEBPACK VAR INJECTION */}.call(exports, "?noInfo=true&reload=true", __webpack_require__(34)(module)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(36);
exports.encode = exports.stringify = __webpack_require__(37);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(39)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#E8E8E8',
  lineHeight: '1.2',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left'
};
for (var key in styles) {
  clientOverlay.style[key] = styles[key];
}

var ansiHTML = __webpack_require__(41);
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
ansiHTML.setColors(colors);

var Entities = __webpack_require__(42).AllHtmlEntities;
var entities = new Entities();

exports.showProblems =
function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
};

exports.clear =
function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
};

var problemColors = {
  errors: colors.red,
  warnings: colors.yellow
};

function problemType (type) {
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
      type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(43),
  Html4Entities: __webpack_require__(44),
  Html5Entities: __webpack_require__(28),
  AllHtmlEntities: __webpack_require__(28)
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}

var hmrDocsUrl = "https://webpack.js.org/concepts/hot-module-replacement/"; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = { ignoreUnaccepted: true };

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == "idle") {
    if (options.log) console.log("[HMR] Checking for updates on the server...");
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if(!updatedModules) {
        if (options.warn) {
          console.warn("[HMR] Cannot find update (Full reload needed)");
          console.warn("[HMR] (Probably because of restarting the server)");
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }

    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
        result.then(function(updatedModules) {
            cb(null, updatedModules);
        });
        result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if(unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
          "(Full reload needed)\n" +
          "This is usually because the modules which have changed " +
          "(and their parents) do not know how to hot reload themselves. " +
          "See " + hmrDocsUrl + " for more details."
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn("[HMR]  - " + moduleMap[moduleId]);
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if(!renewedModules || renewedModules.length === 0) {
        console.log("[HMR] Nothing hot updated.");
      } else {
        console.log("[HMR] Updated modules:");
        renewedModules.forEach(function(moduleId) {
          console.log("[HMR]  - " + moduleMap[moduleId]);
        });
      }

      if (upToDate()) {
        console.log("[HMR] App is up to date.");
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn("[HMR] Cannot check for update (Full reload needed)");
        console.warn("[HMR] " + err.stack || err.message);
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn("[HMR] Update check failed: " + err.stack || err.message);
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn("[HMR] Reloading page");
      window.location.reload();
    }
  }
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(6, function() {
			var newContent = __webpack_require__(6);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(2);

var _vuex2 = _interopRequireDefault(_vuex);

var _vueRouter = __webpack_require__(29);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _api = __webpack_require__(50);

var _api2 = _interopRequireDefault(_api);

var _navsbar = __webpack_require__(51);

var _navsbar2 = _interopRequireDefault(_navsbar);

var _leftpad = __webpack_require__(55);

var _leftpad2 = _interopRequireDefault(_leftpad);

var _leftpadsmall = __webpack_require__(59);

var _leftpadsmall2 = _interopRequireDefault(_leftpadsmall);

var _index = __webpack_require__(63);

var _index2 = _interopRequireDefault(_index);

var _store = __webpack_require__(136);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);
_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_api2.default);

//组件
// import CMyComponent            from '_PLUGIN_/mycomponent.vue';


//路由


//Vuex


//基础样式
// import './less/app.less';

//实例
window.vueapp = new _vue2.default({
    el: '#vueapp',
    components: {
        'c-navsbar': _navsbar2.default,
        'c-leftpad': _leftpad2.default,
        'c-leftpadsmall': _leftpadsmall2.default
    },
    router: _index2.default,
    store: _store2.default,
    data: function data() {
        return {
            navs: {
                list: [],
                current: ''
            }
        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)(['topbar', 'leftbar', 'leftbarsmall'])),
    methods: _extends({}, (0, _vuex.mapActions)(['toggle_leftbar']), {
        //顶部导航切换
        navswitch: function navswitch(item) {
            debugger;
        }
    }),
    created: function created() {
        // debugger;
        // this.actions.marge_data();
        this.navs.current = '';
        this.navs.list = [{
            value: '',
            icon: 'icon-apps',
            class: 'home',
            path: '/admin'
        }, {
            value: '用户',
            icon: '',
            class: '',
            path: '/admin-users'
        }, {
            value: '角色',
            icon: '',
            class: '',
            path: '/admin-roles'
        }, {
            value: '权限',
            icon: '',
            class: '',
            path: '/admin-power'
        }, {
            value: '系统配置',
            icon: '',
            class: '',
            path: '/admin-setting'
        }];
    }
});

/***/ }),
/* 49 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// import Message          from '_IVIEW_/message';
// import Modal            from '_IVIEW_/modal';
// import Pinyin           from './pinyin';
// import MD5              from './md5';
/*
//                    _ooOoo_
//                   o8888888o
//                   88" . "88
//                   (| -_- |)
//                    O\ = /O
//                ____/`---'\____
//              .   ' \\| |// `.
//               / \\||| : |||// \
//             / _||||| -:- |||||- \
//               | | \\\ - /// | |
//             | \_| ''\---/'' | |
//              \ .-\__ `-` ___/-. /
//           ___`. .' /--.--\ `. . __
//        ."" '< `.___\_<|>_/___.' >'"".
//       | | : `- \`.;`\ _ /`;.`/ - ` : | |
//         \ \ `-. \_ __\ /__ _/ .-` / /
// ======`-.____`-.___\_____/___.-`____.-'======
//                    `=---='
//
// .............................................
//          佛祖保佑             永无BUG
*/

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1,
    //js数组最大索引号
toString = window.toString,
    viewUtil = window.viewUtil,
    dr = window.dr,
    QUERY_SERVICE = window.QUERY_SERVICE,
    SERVICE_PREFIX = window.SERVICE_PREFIX,
    uploadApi4base64 = window.uploadApi4base64,
    uploadPath = window.uploadPath,
    createfolderApi = window.createfolderApi,
    rtype = window.rtype,
    rid = window.rid,
    nowCompanyId = window.nowCompanyId;

//vue通用api插件
var api = {
    //类型判断
    //数组
    isarray: Array.isArray || function (target) {
        return toString.call(target) === '[object Array]';
    },
    //类数组
    isarraylike: function isarraylike(target) {
        var len = target && target.length;
        return len && 'number' === typeof len && 0 <= len && len <= MAX_ARRAY_INDEX;
    },
    isboolean: function isboolean(target) {
        return target === true || target === false || toString.call(target) === '[object Boolean]';
    },
    isdate: function isdate(target) {
        return toString.call(target) === '[object Date]';
    },
    isnumber: function isnumber(target) {
        return typeof target === 'number';
    },
    isstring: function isstring(target) {
        return typeof target === 'string';
    },
    isfunction: function isfunction(target) {
        return typeof target === 'function';
    },

    //普通对象
    isobject: function isobject(target) {
        return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object';
    },

    //键值对象
    isplainobject: function isplainobject(target) {
        return target && api.isobject(target) && Object.getPrototypeOf(target) === Object.prototype;
    },


    //判断某值是否存在于对象类型数组的某属性
    hasvalue: function hasvalue(obj, key, value) {
        var res = false;
        api.each(obj, function (item, i) {
            if (item[key] && item[key] === value) {
                res = true;
                return false;
            }
        });
        return res;
    },

    //判断对象是否包含某直接属性（非原型）
    haskey: function haskey(obj, key) {
        return obj !== null && hasOwnProperty.call(obj, key);
    },

    //获取对象所有属性名
    allkeys: function allkeys(obj) {
        if (!api.isobject(obj)) {
            return [];
        }
        var keys = [],
            key = void 0;
        for (key in obj) {
            keys.push(key);
        }
        return keys;
    },

    //获取对象自有属性名（不包含原型属性）
    keys: function keys(obj) {
        if (!api.isobject(obj)) {
            return [];
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [],
            key = void 0;
        for (key in obj) {
            if (api.haskey(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    },

    //获取对象自有属性值（数组）
    values: function values(obj) {
        var keys = api.keys(obj),
            len = keys.length,
            i = 0,
            arr = Array(len);

        for (; i < len; i++) {
            arr[i] = obj[keys[i]];
        }
        return arr;
    },

    //对象属性扩展覆盖（同jQuery/Angularjs）
    //放弃使用Object.assign, 因为Object.assign只能覆盖一层，不能深度扩展
    //return Object.assign.apply( (arguments.length > 0 ? arguments[0] : this), arguments);
    extend: function extend( /*isdeep,*/obj) {
        var len = arguments.length,
            idx = 1,
            isdeep = false;
        if (len < 2 || obj === null) {
            return obj;
        }
        if (api.isboolean(arguments[0])) {
            isdeep = arguments[0];
            obj = arguments[1];
            idx++;
        }
        var source = void 0,
            keys = void 0,
            proplen = void 0,
            i = void 0,
            key = void 0,
            iscopyarr = void 0,
            clone = void 0;
        for (; idx < len; idx++) {
            //多对象
            source = arguments[idx]; //扩展目标对象
            keys = api.allkeys(source);
            proplen = keys.length;
            for (i = 0; i < proplen; i++) {
                key = keys[i];
                if (source[key] === obj) {
                    //防止引用对象包含关系，导致死循环
                    continue;
                }
                if (isdeep && (api.isplainobject(source[key]) || (iscopyarr = api.isarray(source[key])))) {
                    if (iscopyarr) {
                        iscopyarr = false;
                        clone = obj[key] && api.isarray(obj[key]) ? obj[key] : [];
                    } else {
                        clone = obj[key] && api.isPlainObject(obj[key]) ? obj[key] : {};
                    }
                    obj[key] = api.extend(isdeep, clone, source[key]);
                } else if (void 0 !== source[key]) {
                    obj[key] = source[key];
                }
            }
        }
        return obj;
    },
    //拷贝
    copy: function copy(target) {
        var isdeep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var clone = void 0;
        if (api.isarray(target)) {
            clone = [];
        } else {
            clone = {};
        }
        return api.extend(isdeep, clone, target);
    },

    //遍历工具，dataset可以是数组和对象
    //回调函数 fn( item, index|key, dataset);
    // break----用return false;
    // continue --用return ture;
    each: function each(dataset, fn, context) {
        var callback = 'undefined' === typeof context ? fn : function (value, index, collection) {
            return fn.call(context, value, index, collection);
        };
        var i = void 0,
            len = void 0,
            res = void 0;
        if (api.isarraylike(dataset)) {
            //类数组
            i = 0;
            len = dataset.length;
            for (; i < len; i++) {
                res = callback(dataset[i], i, dataset);
                if (false === res) {
                    break;
                } else if (true === res) {
                    continue;
                }
            }
        } else {
            //键值对象
            var keys = api.keys(dataset);
            i = 0;
            len = keys.length;
            for (; i < len; i++) {
                res = callback(dataset[keys[i]], keys[i], dataset);
                if (false === res) {
                    break;
                } else if (true === res) {
                    continue;
                }
            }
        }
        return dataset;
    },

    //队列缓存对象生产器（返回一个缓存区对象）
    createcache: function createcache(maxlen) {
        var keys = [];
        function cache(key, value) {
            if (false !== maxlen && keys.push[key + ' '] > maxlen) {
                //key加一个空格符，与原型属性做一下区分，避免原型属性被修改
                delete cache[keys.shift()];
            }
            if ('undefined' !== typeof value) {
                return cache[key + ' '] = value;
            } else {
                return cache[key + ' '];
            }
        }
        return cache;
    },

    //降频处理器
    later: function later(fn, delay, immediate) {
        var timer = void 0;
        return function () {
            var context = this,
                args = arguments,
                callnow = immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (!immediate) {
                    fn.apply(context, args);
                }
                timer = null;
            }, delay);
            if (callnow) {
                fn.apply(context, args);
            }
        };
    },


    //去掉字符串前后空格
    trim: function trim(str) {
        return 'undefined' !== typeof str.trim ? str.trim() : str.replace(/(^\s*)|(\s*$)/g, '');
    },

    //裁剪字符串
    substr: function substr(str, start, len) {
        str = String(str).toString();
        start = start || 0;
        len = len || str.length;
        return str.substr(start, len);
    },

    //前置补零
    prefillzero: function prefillzero(num, len) {
        num = num.toString();
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    },

    //获取文件后缀
    sufix: function sufix(url) {
        var islower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        url = url.substr(url.lastIndexOf('.') + 1);
        return true === islower ? url.toLowerCase() : url.toUpperCase();
    },

    //汉子转拼音
    pinyin: function pinyin(str) {
        var isupper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isfirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!str) {
            return str;
        }
        str = isfirst ? Pinyin.convert_first(str) : Pinyin.convert(str);
        return isupper ? str.toUpperCase() : str.toLowerCase();
    },


    //字符串转日期
    str2date: function str2date(strdate) {
        var arr = strdate.split(/[- \/:]/g) || [];
        arr[0] = arr[0] || 1986;
        arr[1] = arr[1] || 6;
        arr[2] = arr[2] || 1;
        arr[3] = arr[3] || 0;
        arr[4] = arr[4] || 0;
        arr[5] = arr[5] || 0;
        return new Date(arr[0], --arr[1], arr[2], arr[3], arr[4], arr[5]);
    },

    //日期格式化
    fmtdate: function fmtdate(date) {
        var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';

        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    },

    //获得日期对应的星期数
    getweekday: function getweekday(date) {
        var map = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        if (api.isdate(date)) {
            return map[date.getDay()];
        } else if (api.isstring(date)) {
            date = date.split(/[- :]/g);
            date = new Date(date[0], --date[1], date[2]);
            return map[date.getDay()];
        } else {
            return '';
        }
    },

    //获得日期对应的星期数
    dateplus: function dateplus(date) {
        if (api.isstring(date)) {
            date = api.str2date(date);
        }
        return {
            self: date,
            text: api.fmtdate(date), //字符串全日期
            time: date.getTime(), //整数时间戳
            y: date.getFullYear(), //年
            M: date.getMonth() + 1, //月
            d: date.getDate(), //日
            D: api.getweekday(date), //星期
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            q: Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };
    },

    //日期加减
    // fmt = '-d5'; //五天前
    // fmt = '+d5'; //五天后
    // fmt = '-M5'; //五个月前
    // fmt = '+M5'; //五个月后
    adddate: function adddate(date, fmt) {
        var dateplus = void 0,
            matchs = void 0,
            mothed = void 0,
            type = void 0,
            value = void 0;
        dateplus = api.dateplus(date);

        matchs = fmt.match(/^([-+])([A-Za-z])(\d)*$/);
        if (matchs && matchs[1] && matchs[2] && matchs[3]) {
            mothed = matchs[1];
            type = matchs[2];
            value = matchs[3];

            switch (type) {
                case 'y':
                    dateplus.y += parseInt(mothed + value);
                    date.setFullYear(dateplus.y);
                    break;
                case 'M':
                    dateplus.M += parseInt(mothed + value);
                    date.setMonth(dateplus.M);
                    break;
                case 'd':
                    dateplus.d += parseInt(mothed + value);
                    date.setDate(dateplus.d);
                    break;
                case 'h':
                    dateplus.h += parseInt(mothed + value);
                    date.setHours(dateplus.h);
                    break;
                case 'm':
                    dateplus.m += parseInt(mothed + value);
                    date.setMinutes(dateplus.m);
                    break;
            }
            return date;
        } else {
            return false;
        }
    },


    //统一信息提示
    /*info() {
        Message.info.apply(this, arguments);
    },
    success() {
        Message.success.apply(this, arguments);
    },
    error() {
        Message.error.apply(this, arguments);
    },
    confirm( content, fnok, fncancel, textok, textcancel ) {
        Modal.confirm({
            content: '<span style="font-size: 18px;">'+ content +'</span>',
            okText: textok || '确定',
            onOk: fnok || function(){},
            cancelText: textcancel || '取消',
            onCancel: fncancel || function(){}
        });
    },*/

    //获得一个流水号
    nowid: function nowid() {
        var now = new Date().getTime();
        now += window.g35user._id;
        return now;
    },

    //http工具
    http: function http() {
        return $.ajax.apply(this, arguments); //可更换第三方支持promise的ajax工具
    },

    //数据统一接口
    ajax: function ajax(url, data) {
        if (url === false) {
            url = QUERY_SERVICE;
        }
        var params = {
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json'
        };
        return api.http(params).then(function (res) {
            if (!res) {
                return false;
            }
            if (res && !!res.encode_str) {
                try {
                    res = JSON.parse(dr(res.encode_str));
                    // res = JSON.parse( MD5.hex(res.encode_str) );
                } catch (ex) {
                    api.error('数据错误！');
                    return false;
                }
            }
            if (res.refresh) {
                window.location.reload();
                return false;
            }
            if (res.result === 'ServerError') {
                api.error('操作超时，请重试或刷新页面！');
                return false;
            }
            if (res.result.toUpperCase() !== 'TRUE') {
                if (res.result === 'FALSE' && res.errorcode === 'COMPANY_CRM_PAYED_TIME_EXPIRED') {
                    viewUtil.isCRMNoPayed();
                    return false;
                }
                if (res.result === 'FALSE' && res.errorcode === 'ERROR_NO_AUTHORITY') {
                    if ($('#taskDetail').length) {
                        viewUtil.showSummary();
                    } else {
                        api.error('无权限查看相关内容');
                    }
                    return false;
                }
                if (res.result === 'FALSE' && (res.errorcode === 'ERROR_BE_DELETED' || res.errorcode === 'be_deleted')) {
                    api.error('内容已被删除');
                    return false;
                }
                if (res.result === 'FALSE' && res.errorcode === 'ERROR_REPEATED') {
                    api.error('已有相关内容');
                    return false;
                }
                //续费已过期
                if (res.result === 'FALSE' && res.errorcode === 'COMPANY_PAYED_TIME_EXPIRED') {
                    viewUtil.companyNoPayedBox();
                    return false;
                }
                if (res.result === 'FALSE' && res.msg === 'ERROR_DB_GAOXIN_DATA_EXIST') {
                    api.error('已存在相同数据，请勿重复提交！');
                    return false;
                }
                api.error('操作失败');
            }
            return res;
        }, function (res) {
            api.error('操作超时，请重试或刷新页面！');
        });
    },


    //upyun上传接口
    //data = {policy, signature, file}
    ajaxupyun: function ajaxupyun(url, data) {
        var formData = new FormData(),
            nowid = api.nowid(),
            filedata = {
            nowid: nowid,
            filetype: data.file.type,
            size: data.file.size,
            file_nowid: nowid,
            file_name: data.file.name,
            file_url: ''
        };

        api.each(data, function (item, key) {
            formData.append(key, item);
        });

        var params = {
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        };

        return api.http(params).then(function (res) {
            // debugger;
            if ('string' === typeof res) {
                res = JSON.parse(res);
            } else {
                res = res;
            }
            if (200 === res.code && 'ok' === res.message) {
                var isimage = /image\/\w+/.test(res.mimetype);
                if (isimage) {
                    if (res['image-width']) {
                        filedata.file_width = res['image-width'];
                        filedata.width = res['image-width'];
                    }
                    if (res['image-height']) {
                        filedata.file_height = res['image-height'];
                        filedata.height = res['image-height'];
                    }
                    filedata.file_url = 'https://groups35-images.b0.upaiyun.com' + res.url.substr(0, 9) + encodeURIComponent(res.url.substr(9)) + '!normal';
                    filedata.file_type = 'pic';
                    filedata.type = '1';
                } else {
                    filedata.file_url = 'https://groups35-notimage.b0.upaiyun.com' + res.url.substr(0, 9) + encodeURIComponent(res.url.substr(9));
                    filedata.file_type = 'files';
                    filedata.type = '3';
                }
                return filedata;
            } else {
                api.error('云存储数据异常！');
            }
        }, function (res) {
            if (res && res.responseJSON) {
                api.error('云存储错误：' + res.responseJSON.code + ' - ' + res.responseJSON.message);
            }
        });
    },

    //保存附件文件信息
    savefile: function savefile(filedata) {
        var params = {
            httpType: 'post',
            serviceName: 'file',
            functionName: 'addToGroupOrP2P',
            user_id: '',
            token: '',
            company_id: nowCompanyId
        };
        params = api.extend(params, filedata);

        return api.ajax(false, params).then(function (res) {
            if (res && 'TRUE' === res.result) {
                res.data.created = '刚刚'; //返回新数据，未日期格式化
                return res.data;
            } else {
                api.error('保存附件失败！');
            }
        }, function (res) {
            // debugger;
            api.error('保存附件失败！');
        });
    },

    //上传附件
    //attachtype = msg|group|temp       //附件分类
    //attachdata = {type, id}           //分类信息
    uploadattach: function uploadattach(file, attachtype, attachdata) {
        var configtype = 'files';
        if (/image\/\w+/.test(file.type)) {
            configtype = 'images';
        }
        if (/audio\/\w+/.test(file.type)) {
            configtype = 'audio';
        }

        var params = {
            serviceName: 'file',
            functionName: 'getUploadInfoNoReturn',
            type: configtype,
            file_name: encodeURIComponent(file.name),
            service_params_order: ['type', 'file_name']
        };
        return api.ajax(false, params).then(function (res) {
            //获得upyun验证配置
            if (res && 'TRUE' === res.result && res.data) {
                res = res.data;

                var data = {
                    policy: res.policy,
                    signature: res.signature,
                    file: file
                };
                return api.ajaxupyun(res.action, data);
            } else {
                api.error('upyun配置数据异常！');
            }
        }).then(function (res) {
            //保存附件文件信息
            var filedata = {
                file_url: res.file_url,
                type: res.file_type,
                title: res.file_name,
                size: res.size,
                file_rtype: '',
                file_rid: '0'
            };

            if ('pic' === res.type) {
                filedata.width = res.file_width;
                filedata.height = res.file_height;
            }

            if ('task' === attachtype) {
                filedata.from = attachtype;
            }
            if ('msg' === attachtype) {
                filedata.file_rtype = attachdata.type || rtype; //rtype、rid兼容老代码的全局变量
                filedata.file_rid = attachdata.id || rid;
            }
            if ('group' === attachtype) {
                filedata.file_rtype = attachdata.type;
                filedata.file_rid = attachdata.id;

                if ('task' !== attachtype) {
                    filedata.from_group_id = attachdata.id;
                }
            }

            if ('p2p' === filedata.file_rtype) {
                filedata.another_user_id = filedata.file_rid;
            }
            if ('all' === filedata.file_rtype) {
                filedata.file_rid = 0;
                filedata.another_user_id = 0;
            }

            return api.savefile(filedata);
        });
    },

    //上传图片（不保存附件管理记录）
    uploadimage: function uploadimage(src, rid, rtype) {
        var params = {
            nowid: api.nowid(),
            img_src: src
        };
        if (rid) {
            params.rid = rid;
        }
        if (rtype) {
            params.rtype = rtype;
        }

        return api.ajax(SERVICE_PREFIX + 'upload/uploadCaptureOrDragImg', params);
    },

    //根据路径创建目录（本地服务器）
    createfolder: function createfolder(opt) {
        if (api.isarray(opt.paths)) {
            opt.paths = opt.paths.join('<+>');
        }

        var params = {
            httpType: 'post',
            serviceName: '',
            functionName: '',
            serviceURL: createfolderApi, //上传API地址
            paths: opt.paths || ''
        };
        return api.ajax(false, params);
    },

    //上传文件（base64）
    uploadlocal4base64: function uploadlocal4base64(opt) {
        var params = {
            httpType: 'post',
            serviceName: '',
            functionName: '',
            serviceURL: uploadApi4base64, //上传API地址
            host: uploadPath, //服务器地址
            imgdata: opt.imgdata,
            path: opt.path || '',
            filename: opt.filename || ''
        };
        return api.ajax(false, params);
    },

    //已上传文件列表
    getfiles: function getfiles() {
        var filetype = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'file';
        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

        var image_only = void 0;
        switch (filetype) {
            case 'file':
                image_only = 0;
                break;
            case 'pic':
                image_only = 1;
                break;
        }

        var params = {
            serviceName: 'file',
            functionName: 'getItemsByUserId',
            user_id: '',
            token: '',
            company_id: nowCompanyId,
            limit: limit,
            page: page,
            image_only: image_only,
            service_params_order: ['user_id', 'token', 'company_id', 'limit', 'page', 'image_only']
        };
        return api.ajax(false, params);
    },

    //切换图片upyun尺寸
    imagemode: function imagemode(url, mode) {
        if (!url || !mode) {
            return url;
        }
        if ('NORMAL' === mode) {
            return url.replace(/\!\w*/, '!normal');
        } else if ('THUMBNAIL' === mode) {
            return url.replace(/\!\w*/, '!thumbnail');
        } else if ('ORIGIN' === mode) {
            return url.replace(/\!\w*/, '');
        }
    },


    //获取项目详情
    getprojectdetail: function getprojectdetail(projectid) {
        var params = {
            user_id: '',
            token: '',
            serviceName: 'project',
            functionName: 'getProjectInfo',
            httpType: 'post',
            project_id: projectid,
            tiny: 0
        };
        return api.ajax(false, params);
    },

    //获取项目阶段列表
    getprojectstages: function getprojectstages(projectid) {
        var params = {
            httpType: 'get',
            serviceName: 'stage',
            functionName: 'getStageByProjectId',
            user_id: '',
            token: '',
            project_id: projectid,
            service_params_order: ['user_id', 'token', 'project_id']
        };
        return api.ajax(false, params);
    },

    //获取所有参与项目
    getprojects: function getprojects() {
        var params = {
            httpType: 'get',
            serviceName: 'project',
            functionName: 'getCanVisibleProjectList',
            user_id: '',
            token: '',
            company_id: nowCompanyId,
            service_params_order: ['user_id', 'token', 'company_id']
        };
        return api.ajax(false, params);
    },

    //获取所有客户
    getcustomers: function getcustomers() {
        var params = {
            httpType: 'post',
            serviceName: 'customer',
            functionName: 'listOwnCustomers',
            user_id: '',
            token: '',
            limit: 99999,
            page: 1,
            company_id: nowCompanyId
        };
        return api.ajax(false, params);
    },


    //通过用户id获得用户
    getuser: function getuser(id) {
        return id && window.orgUsers[id] ? window.orgUsers[id] : null;
    },

    //筛选用户
    queryusers: function queryusers(keywords, source) {
        var res = [];
        keywords = keywords.toUpperCase();
        if (keywords !== '') {
            api.each(source, function (user, index) {
                if (user.nickname_en && -1 < user.nickname_en.replace('/,/g', '').toUpperCase().indexOf(keywords)) {
                    res.push(user);
                    return true;
                } else if (user.nickname && -1 < user.nickname.replace('/,/g', '').toUpperCase().indexOf(keywords)) {
                    res.push(user);
                    return true;
                }
            });
        }
        return res;
    },


    //向pomelo服务器发送消息
    send_comment: function send_comment(opt) {
        var params = {
            httpType: 'post',
            serviceName: 'task',
            functionName: 'addComment',
            user_id: '',
            token: ''
        };
        if (opt.type) {
            params.sub_type = opt.type;
        }
        if (opt.data) {
            params.data = opt.data;
        }

        return api.ajax(false, params).then(function (res) {
            if (res && res.result && 'TRUE' === res.result) {} else {
                //
            }
        }, function (res) {
            //
        });
    }
};
//扩展部分
api.extend(api, {
    //创建一个全局缓存队列
    cache: api.createcache(false)
});

//懒加载组件
function findvmfromfrag(frag) {
    var node = frag.node;
    if (frag.end) {
        while (!node.__vue__ && node !== frag.end && node.nextSibling) {
            node = node.nextSibling;
        }
    }
    return node.__vue__;
}
//扩展部分
api.extend(api, {
    install: function install(Vue, options) {
        Vue.$fn = api;
        Vue.prototype.$fn = api;

        Vue.directive('floaded', {
            bind: function bind() {
                // debugger;
                // console.log(1111111111);
                // console.log($('#projectprogress-ganttbox').length);
            },
            update: function update() {
                // debugger;
                // console.log(3333333333);
                // console.log($('#projectprogress-ganttbox').length);
            },
            unbind: function unbind() {
                // debugger;
                // console.log(5555555555);
                // console.log($('#projectprogress-ganttbox').length);
            }
        });

        //可编辑元素 contenteditable="true"
        Vue.directive('edit', {
            twoWay: true,
            bind: function bind() {
                this.handler = function () {
                    this.set(this.el.innerHTML);
                }.bind(this);
                this.el.addEventListener('keyup', this.handler); //每次输入内容后，重新双向绑定
            },
            update: function update(newValue, oldValue) {
                this.el.innerHTML = newValue || '';
            },
            unbind: function unbind() {
                this.el.removeEventListener('keyup', this.handler);
            }
        });

        //懒加载组件
        var FragmentFactory = Vue.FragmentFactory;
        var _Vue$util = Vue.util,
            createAnchor = _Vue$util.createAnchor,
            replace = _Vue$util.replace;

        Vue.directive('lazy', {
            terminal: true,
            bind: function bind() {
                // this.INITED = false;
                this.anchor = createAnchor('v-if');
                replace(this.el, this.anchor);
            },
            update: function update(value) {
                var _this = this;

                if (this.INITED) {
                    return;
                }
                window.setTimeout(function () {
                    _this.insert();
                    _this.updateref();
                    _this.INITED = true;
                }, value || 0);
            },
            unbind: function unbind() {
                if (this.frag) {
                    this.frag.destroy();
                }
            },

            // insert dom
            insert: function insert() {
                if (!this.factory) {
                    this.factory = new FragmentFactory(this.vm, this.el);
                }
                this.frag = this.factory.create(this._host, this._scope, this._frag);
                this.frag.before(this.anchor, !this.modifiers['no-animation']); //multiBefore(target, withTransition)
            },

            // update v-ref
            updateref: function updateref() {
                var ref = this.descriptor.ref;
                if (!ref) {
                    return;
                }

                var hash = (this.vm || this._scope).$refs,
                    refs = hash[ref],
                    key = this._frag.scope.$key;

                if (!refs) {
                    return;
                }

                if (Array.isArray(refs)) {
                    refs.push(findvmfromfrag(this._frag));
                } else {
                    refs[key] = findvmfromfrag(this._frag);
                }
            }
        });
    }
});
exports.default = api;

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_navsbar_vue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_navsbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_navsbar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_7d036194_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_navsbar_vue__ = __webpack_require__(54);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(52)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_navsbar_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_7d036194_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_navsbar_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\common\\navsbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navsbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d036194", Component.options)
  } else {
    hotAPI.reload("data-v-7d036194", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(7, function() {
			var newContent = __webpack_require__(7);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    props: {
        list: {
            type: Array,
            required: true
        },
        value: {
            type: String
        }
    },
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //
        classesitem: function classesitem(item) {
            var classes = {};
            if (this.value === item.value) {
                classes['active'] = true;
            }
            if (item.class) {
                this.$fn.each(item.class.split(' '), function (classname, idx) {
                    classes[classname] = true;
                });
            }
            console.log(classes);
            return classes;
        },

        //切换nav
        switchnav: function switchnav(item) {
            debugger;
            this.$emit('input', item.value);
            this.$emit('onswitch', item);
        }
    },
    mounted: function mounted() {
        // debugger;
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "navbar"
  }, [_vm._l((_vm.list), function(item, idx) {
    return [_c('a', {
      staticClass: "nav",
      class: _vm.classesitem(item),
      on: {
        "click": function($event) {
          _vm.switchnav(item)
        }
      }
    }, [(item.icon) ? _c('i', {
      staticClass: "iconfont icon-apps"
    }) : _vm._e(), _vm._v(" "), (item.value) ? _c('span', [_vm._v(_vm._s(item.value))]) : _vm._e()])]
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-7d036194", esExports)
  }
}

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpad_vue__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpad_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpad_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_2bcbf1dd_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_leftpad_vue__ = __webpack_require__(58);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(56)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpad_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_2bcbf1dd_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_leftpad_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\common\\leftpad.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] leftpad.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2bcbf1dd", Component.options)
  } else {
    hotAPI.reload("data-v-2bcbf1dd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(8, function() {
			var newContent = __webpack_require__(8);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    props: {},
    data: function data() {
        return {
            menu: {
                theme: true,
                modules: false,
                all: false
            }
        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)(['leftbar'])),
    methods: _extends({}, (0, _vuex.mapActions)(['toggle_leftbar']), {
        //展开收起子菜单
        togglemenu: function togglemenu(type) {
            this.menu[type] = !this.menu[type];
        }
    }),
    created: function created() {
        // debugger;
    }
};

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "leftpad wrapper"
  }, [_c('div', {
    staticClass: "avatarbox"
  }, [_c('div', {
    staticClass: "avatarbox-content"
  }, [_c('button', {
    staticClass: "btn-toggle",
    on: {
      "click": function($event) {
        _vm.toggle_leftbar()
      }
    }
  }, [_c('i', {
    staticClass: "iconfont icon-down",
    class: {
      active: _vm.leftbar.show
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "avatar-image",
    staticStyle: {
      "background-image": "url(/public/images/avatar.png)"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "avatar-name"
  }, [_vm._v("王小二")]), _vm._v(" "), _c('div', {
    staticClass: "avatar-remark"
  }, [_vm._v("市场部-专员")])])]), _vm._v(" "), _c('div', {
    staticClass: "menusbox"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "menus-group"
  }, [_c('div', {
    staticClass: "groupname"
  }), _vm._v(" "), _c('div', {
    staticClass: "menu haschild"
  }, [_c('span', {
    staticClass: "name",
    class: {
      active: _vm.menu.theme
    },
    on: {
      "click": function($event) {
        _vm.togglemenu('theme')
      }
    }
  }, [_c('i', {
    staticClass: "iconfont icon-theme-inverse"
  }), _vm._v("主题样式\n                    ")]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [(_vm.menu.theme) ? _c('div', {
    staticClass: "child",
    attrs: {
      "transition": "slide"
    }
  }, [_c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-color"
    }
  }, [_vm._v("配色")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-grid"
    }
  }, [_vm._v("栅格")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-table"
    }
  }, [_vm._v("表格")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-button"
    }
  }, [_vm._v("按钮")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-popmenu"
    }
  }, [_vm._v("气泡菜单")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-check"
    }
  }, [_vm._v("选择项")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-select"
    }
  }, [_vm._v("下拉")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-tabs"
    }
  }, [_vm._v("标签页")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-tag"
    }
  }, [_vm._v("标签")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-input"
    }
  }, [_vm._v("输入框")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-form"
    }
  }, [_vm._v("表单")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-dialog"
    }
  }, [_vm._v("对话框")])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('router-link', {
    staticClass: "name",
    attrs: {
      "to": "/admin-theme-icons"
    }
  }, [_vm._v("字体图标")])], 1)]) : _vm._e()])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu haschild"
  }, [_c('span', {
    staticClass: "name",
    class: {
      active: _vm.menu.modules
    },
    on: {
      "click": function($event) {
        _vm.togglemenu('modules')
      }
    }
  }, [_c('i', {
    staticClass: "iconfont icon-window-inverse"
  }), _vm._v("功能模块\n                    ")]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [(_vm.menu.modules) ? _c('div', {
    staticClass: "child",
    attrs: {
      "transition": "slide"
    }
  }, [_c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_vm._v("用户管理")])]), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_vm._v("订单管理")])])]) : _vm._e()])], 1), _vm._v(" "), _c('div', {
    staticClass: "menu haschild"
  }, [_c('span', {
    staticClass: "name",
    class: {
      active: _vm.menu.all
    },
    on: {
      "click": function($event) {
        _vm.togglemenu('all')
      }
    }
  }, [_c('i', {
    staticClass: "iconfont icon-list"
  }), _vm._v("文章模块\n                    ")]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [(_vm.menu.all) ? _c('div', {
    staticClass: "child"
  }, [_c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_vm._v("文章管理")])]), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_vm._v("文章分类")])])]) : _vm._e()])], 1), _vm._v(" "), _vm._m(1)])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menus-group"
  }, [_c('div', {
    staticClass: "groupname"
  }), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_c('i', {
    staticClass: "iconfont icon-file-inverse"
  }), _vm._v("发布文章")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menus-group"
  }, [_c('div', {
    staticClass: "groupname"
  }), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_c('i', {
    staticClass: "iconfont icon-lock-inverse"
  }), _vm._v("修改密码")])]), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('a', {
    staticClass: "name",
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_c('i', {
    staticClass: "iconfont icon-file-inverse"
  }), _vm._v("退出登录")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-2bcbf1dd", esExports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpadsmall_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpadsmall_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpadsmall_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_73a6effa_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_leftpadsmall_vue__ = __webpack_require__(62);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(60)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_leftpadsmall_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_73a6effa_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_leftpadsmall_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\common\\leftpadsmall.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] leftpadsmall.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73a6effa", Component.options)
  } else {
    hotAPI.reload("data-v-73a6effa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(9, function() {
			var newContent = __webpack_require__(9);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    props: {},
    data: function data() {
        return {};
    },

    computed: _extends({}, (0, _vuex.mapGetters)(['leftbarsmall'])),
    methods: _extends({}, (0, _vuex.mapActions)(['toggle_leftbar'])),
    created: function created() {
        // debugger;
    }
};

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "leftpadsmall wrapper"
  }, [_c('button', {
    staticClass: "btn-toggle",
    on: {
      "click": function($event) {
        _vm.toggle_leftbar()
      }
    }
  }, [_c('i', {
    staticClass: "iconfont icon-down",
    class: {
      active: _vm.leftbarsmall.show
    }
  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "appsbar-split"
  }), _vm._v(" "), _vm._m(1)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "appsbar"
  }, [_c('li', {
    staticClass: "appsbar-item",
    staticStyle: {
      "background-image": "url(/public/images/apps/users.svg)"
    }
  }, [_c('div', {
    staticClass: "tip"
  }, [_vm._v("用户管理")])]), _vm._v(" "), _c('li', {
    staticClass: "appsbar-item",
    staticStyle: {
      "background-image": "url(/public/images/apps/password.svg)"
    }
  }, [_c('span', {
    staticClass: "tip"
  }, [_vm._v("修改密码")])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "appsbar"
  }, [_c('li', {
    staticClass: "appsbar-item",
    staticStyle: {
      "background-image": "url(/public/images/apps/check.svg)"
    }
  }, [_c('div', {
    staticClass: "tip"
  }, [_vm._v("审核")])]), _vm._v(" "), _c('li', {
    staticClass: "appsbar-item",
    staticStyle: {
      "background-image": "url(/public/images/apps/charts.svg)"
    }
  }, [_c('span', {
    staticClass: "tip"
  }, [_vm._v("报表")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-73a6effa", esExports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueRouter = __webpack_require__(29);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _index = __webpack_require__(64);

var _index2 = _interopRequireDefault(_index);

var _users = __webpack_require__(68);

var _users2 = _interopRequireDefault(_users);

var _power = __webpack_require__(72);

var _power2 = _interopRequireDefault(_power);

var _roles = __webpack_require__(76);

var _roles2 = _interopRequireDefault(_roles);

var _themeColor = __webpack_require__(80);

var _themeColor2 = _interopRequireDefault(_themeColor);

var _themeGrid = __webpack_require__(84);

var _themeGrid2 = _interopRequireDefault(_themeGrid);

var _themeTable = __webpack_require__(88);

var _themeTable2 = _interopRequireDefault(_themeTable);

var _themeButton = __webpack_require__(92);

var _themeButton2 = _interopRequireDefault(_themeButton);

var _themePopmenu = __webpack_require__(96);

var _themePopmenu2 = _interopRequireDefault(_themePopmenu);

var _themeCheck = __webpack_require__(100);

var _themeCheck2 = _interopRequireDefault(_themeCheck);

var _themeSelect = __webpack_require__(104);

var _themeSelect2 = _interopRequireDefault(_themeSelect);

var _themeTabs = __webpack_require__(108);

var _themeTabs2 = _interopRequireDefault(_themeTabs);

var _themeTag = __webpack_require__(112);

var _themeTag2 = _interopRequireDefault(_themeTag);

var _themeInput = __webpack_require__(116);

var _themeInput2 = _interopRequireDefault(_themeInput);

var _themeForm = __webpack_require__(120);

var _themeForm2 = _interopRequireDefault(_themeForm);

var _themeDialog = __webpack_require__(124);

var _themeDialog2 = _interopRequireDefault(_themeDialog);

var _themeIcons = __webpack_require__(128);

var _themeIcons2 = _interopRequireDefault(_themeIcons);

var _index3 = __webpack_require__(132);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROUTELIST = [{ path: '/', component: _index2.default }, { path: '/admin', component: _index2.default }, { path: '/admin-users', component: _users2.default }, { path: '/admin-power', component: _power2.default }, { path: '/admin-roles', component: _roles2.default }, { path: '/admin-theme-color', component: _themeColor2.default }, { path: '/admin-theme-grid', component: _themeGrid2.default }, { path: '/admin-theme-table', component: _themeTable2.default }, { path: '/admin-theme-button', component: _themeButton2.default }, { path: '/admin-theme-popmenu', component: _themePopmenu2.default }, { path: '/admin-theme-check', component: _themeCheck2.default }, { path: '/admin-theme-select', component: _themeSelect2.default }, { path: '/admin-theme-tabs', component: _themeTabs2.default }, { path: '/admin-theme-tag', component: _themeTag2.default }, { path: '/admin-theme-input', component: _themeInput2.default }, { path: '/admin-theme-form', component: _themeForm2.default }, { path: '/admin-theme-dialog', component: _themeDialog2.default }, { path: '/admin-theme-icons', component: _themeIcons2.default }, { path: '/home', component: _index4.default }];

exports.default = new _vueRouter2.default({
    routes: ROUTELIST
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_ebbbe6e6_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(67);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(65)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_ebbbe6e6_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ebbbe6e6", Component.options)
  } else {
    hotAPI.reload("data-v-ebbbe6e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(10, function() {
			var newContent = __webpack_require__(10);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {
            mode: 'HOME',
            userid4modal: '333',
            showdetail: false
        };
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box"
  }, [_c('div', {
    staticClass: "apps-container"
  }, [_c('div', {
    staticClass: "apps-group"
  }, [_c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/users.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("用户")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/users2.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("用户")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/menu.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("菜单")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "apps-group"
  }, [_c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/documents.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("分类")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/text.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("文章")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/check.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("审核")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/charts.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("报表")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "apps-group"
  }, [_c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/password.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("密码")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/edit.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("编辑")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/setting.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("权限")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "apps-group"
  }, [_c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/submit.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("提交")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/pay.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("支付")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": ""
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/task.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("任务")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "apps-group"
  }, [_c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-color"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-color.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("配色")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-grid"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-grid.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("栅格")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-table"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-table.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("表格")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-button"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-button-play.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("按钮")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-popmenu"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-list.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("气泡菜单")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-check"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-checked.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("选择项")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-select"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-menu.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("下拉")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-tabs"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-tabs.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("标签页")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-tag"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-tag.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("标签")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-input"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-input.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("输入框")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-form"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-form.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("表单")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-dialog"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-window.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("对话框")])]), _vm._v(" "), _c('router-link', {
    staticClass: "apps-item",
    attrs: {
      "to": "/admin-theme-icons"
    }
  }, [_c('i', {
    staticClass: "ico",
    staticStyle: {
      "background-image": "url(/public/images/apps/theme-heart.svg)"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "tit"
  }, [_vm._v("字体图标")])])], 1)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-ebbbe6e6", esExports)
  }
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_users_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_users_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_users_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_60e8327a_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_users_vue__ = __webpack_require__(71);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(69)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_users_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_60e8327a_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_users_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\users.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] users.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60e8327a", Component.options)
  } else {
    hotAPI.reload("data-v-60e8327a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(11, function() {
			var newContent = __webpack_require__(11);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {
            mode: 'HOME',
            userid4modal: '333',
            showdetail: false
        };
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box"
  }, [_c('div', {
    staticClass: "toolsbar"
  }, [_c('div', {
    staticClass: "toolsbar-left"
  }, [_c('button', {
    staticClass: "tool-item"
  }, [_vm._v("添加")]), _vm._v(" "), _c('button', {
    staticClass: "tool-item"
  }, [_vm._v("全选")])]), _vm._v(" "), _c('div', {
    staticClass: "toolsbar-middle"
  }, [_c('div', {
    staticClass: "tool-group"
  }, [_c('button', {
    staticClass: "tool-item"
  }, [_vm._v("天")]), _vm._v(" "), _c('button', {
    staticClass: "tool-item"
  }, [_vm._v("周")]), _vm._v(" "), _c('button', {
    staticClass: "tool-item"
  }, [_vm._v("月")])])]), _vm._v(" "), _c('div', {
    staticClass: "toolsbar-right"
  }, [_c('button', {
    staticClass: "tool-item"
  }, [_vm._v("添加")]), _vm._v(" "), _c('button', {
    staticClass: "tool-item"
  }, [_vm._v("全选")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('table', [_c('thead', [_c('tr', [_c('th', [_vm._v(" ")]), _vm._v(" "), _c('th', [_vm._v("编号")]), _vm._v(" "), _c('th', [_vm._v("姓名")]), _vm._v(" "), _c('th', [_vm._v("部门")]), _vm._v(" "), _c('th', [_vm._v("年龄")]), _vm._v(" "), _c('th', [_vm._v("性别")]), _vm._v(" "), _c('th', [_vm._v("角色")]), _vm._v(" "), _c('th', [_vm._v(" ")])])]), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_vm._v("32442")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid grid-line",
    staticStyle: {
      "margin-top": "50px"
    }
  }, [_c('table', [_c('thead', [_c('tr', [_c('th', [_vm._v(" ")]), _vm._v(" "), _c('th', [_vm._v("编号")]), _vm._v(" "), _c('th', [_vm._v("姓名")]), _vm._v(" "), _c('th', [_vm._v("部门")]), _vm._v(" "), _c('th', [_vm._v("年龄")]), _vm._v(" "), _c('th', [_vm._v("性别")]), _vm._v(" "), _c('th', [_vm._v("角色")]), _vm._v(" "), _c('th', [_vm._v(" ")])])]), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_vm._v("32442")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("2")]), _vm._v(" "), _c('td', [_vm._v("32422")]), _vm._v(" "), _c('td', [_vm._v("王小二")]), _vm._v(" "), _c('td', [_vm._v("人事部")]), _vm._v(" "), _c('td', [_vm._v("28")]), _vm._v(" "), _c('td', [_vm._v("男")]), _vm._v(" "), _c('td', [_vm._v("HR")]), _vm._v(" "), _c('td', [_vm._v(" ")])])])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-60e8327a", esExports)
  }
}

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_power_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_power_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_power_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_26b7c980_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_power_vue__ = __webpack_require__(75);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(73)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_power_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_26b7c980_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_power_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\power.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] power.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26b7c980", Component.options)
  } else {
    hotAPI.reload("data-v-26b7c980", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(12, function() {
			var newContent = __webpack_require__(12);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {
            mode: 'HOME',
            userid4modal: '333',
            showdetail: false
        };
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-box"
  }, [_vm._v("\n权限管理\n")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-26b7c980", esExports)
  }
}

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_roles_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_roles_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_roles_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_6152f610_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_roles_vue__ = __webpack_require__(79);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(77)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_roles_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_6152f610_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_roles_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\roles.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] roles.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6152f610", Component.options)
  } else {
    hotAPI.reload("data-v-6152f610", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(13, function() {
			var newContent = __webpack_require__(13);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {
            mode: 'HOME',
            userid4modal: '333',
            showdetail: false
        };
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-box"
  }, [_vm._v("\n角色管理\n")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-6152f610", esExports)
  }
}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_color_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_color_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_color_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_57f76d5a_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_color_vue__ = __webpack_require__(83);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(81)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_color_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_57f76d5a_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_color_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-color.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-color.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57f76d5a", Component.options)
  } else {
    hotAPI.reload("data-v-57f76d5a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(14, function() {
			var newContent = __webpack_require__(14);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('h2', [_vm._v("基调配色")]), _vm._v(" "), _c('h3', [_vm._v("色块")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme | .bgkey | .bglight | .bgnice | .bgblack | .bgwhite | .bggray")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock bgtheme-lightest"
  }, [_c('div', [_vm._v("主题-最亮")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme-lightest")]), _vm._v(" "), _c('div', [_vm._v("#D8F6FE")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgtheme-lighter fwhite"
  }, [_c('div', [_vm._v("主题-较亮")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme-lighter")]), _vm._v(" "), _c('div', [_vm._v("#74DEFC")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgtheme-light fwhite"
  }, [_c('div', [_vm._v("主题-亮")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme-light")]), _vm._v(" "), _c('div', [_vm._v("#43D3FC")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bgtheme fwhite"
  }, [_c('div', [_vm._v("主题")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme")]), _vm._v(" "), _c('div', [_vm._v("#05C3F9")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgtheme-dark fwhite"
  }, [_c('div', [_vm._v("主题-暗")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme-dark")]), _vm._v(" "), _c('div', [_vm._v("#319DBB")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgtheme-darker fwhite"
  }, [_c('div', [_vm._v("主题-较暗")]), _vm._v(" "), _c('div', [_vm._v(".bgtheme-darker")]), _vm._v(" "), _c('div', [_vm._v("#027FA2")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgkey-light fwhite"
  }, [_c('div', [_vm._v("关键的-亮")]), _vm._v(" "), _c('div', [_vm._v(".bgkey-light")]), _vm._v(" "), _c('div', [_vm._v("#FC7E6A")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bgkey fwhite"
  }, [_c('div', [_vm._v("关键的")]), _vm._v(" "), _c('div', [_vm._v(".bgkey")]), _vm._v(" "), _c('div', [_vm._v("#F95339")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgkey-dark fwhite"
  }, [_c('div', [_vm._v("关键的-暗")]), _vm._v(" "), _c('div', [_vm._v(".bgkey-dark")]), _vm._v(" "), _c('div', [_vm._v("#BB5D4F")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgkey-darker fwhite"
  }, [_c('div', [_vm._v("关键的-较暗")]), _vm._v(" "), _c('div', [_vm._v(".bgkey-darker")]), _vm._v(" "), _c('div', [_vm._v("#A22613")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock bglight-lightest"
  }, [_c('div', [_vm._v("闪亮的-最亮")]), _vm._v(" "), _c('div', [_vm._v(".bglight-lightest")]), _vm._v(" "), _c('div', [_vm._v("#FFFFC5")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bglight-lighter"
  }, [_c('div', [_vm._v("闪亮的-较亮")]), _vm._v(" "), _c('div', [_vm._v(".bglight-lighter")]), _vm._v(" "), _c('div', [_vm._v("#FFFF73")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bglight-light"
  }, [_c('div', [_vm._v("闪亮的-亮")]), _vm._v(" "), _c('div', [_vm._v(".bglight-light")]), _vm._v(" "), _c('div', [_vm._v("#FFFF41")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bglight"
  }, [_c('div', [_vm._v("闪亮的")]), _vm._v(" "), _c('div', [_vm._v(".bglight")]), _vm._v(" "), _c('div', [_vm._v("#FFFF01")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bglight-dark "
  }, [_c('div', [_vm._v("闪亮的-暗")]), _vm._v(" "), _c('div', [_vm._v(".bglight-dark")]), _vm._v(" "), _c('div', [_vm._v("#FFF201")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bglight-darker "
  }, [_c('div', [_vm._v("闪亮的-较暗")]), _vm._v(" "), _c('div', [_vm._v(".bglight-darker")]), _vm._v(" "), _c('div', [_vm._v("#FFD301")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgnice-lighter fwhite"
  }, [_c('div', [_vm._v("友好的-较亮")]), _vm._v(" "), _c('div', [_vm._v(".bgnice-lighter")]), _vm._v(" "), _c('div', [_vm._v("#67E3B1")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgnice-light fwhite"
  }, [_c('div', [_vm._v("友好的-亮")]), _vm._v(" "), _c('div', [_vm._v(".bgnice-light")]), _vm._v(" "), _c('div', [_vm._v("#39E39E")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bgnice fwhite"
  }, [_c('div', [_vm._v("友好的")]), _vm._v(" "), _c('div', [_vm._v(".bgnice")]), _vm._v(" "), _c('div', [_vm._v("#01C677")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgnice-dark fwhite"
  }, [_c('div', [_vm._v("友好的-暗")]), _vm._v(" "), _c('div', [_vm._v(".bgnice-dark")]), _vm._v(" "), _c('div', [_vm._v("#269568")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgnice-darker fwhite"
  }, [_c('div', [_vm._v("友好的-较暗")]), _vm._v(" "), _c('div', [_vm._v(".bgnice-darker")]), _vm._v(" "), _c('div', [_vm._v("#00814D")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgblack-light fwhite"
  }, [_c('div', [_vm._v("黑-亮")]), _vm._v(" "), _c('div', [_vm._v(".bgblack-light")]), _vm._v(" "), _c('div', [_vm._v("#666")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bgblack fwhite"
  }, [_c('div', [_vm._v("黑")]), _vm._v(" "), _c('div', [_vm._v(".bgblack")]), _vm._v(" "), _c('div', [_vm._v("#444")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgblack-dark fwhite"
  }, [_c('div', [_vm._v("黑-基础")]), _vm._v(" "), _c('div', [_vm._v(".bgblack-dark")]), _vm._v(" "), _c('div', [_vm._v("#333")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgblack-darker fwhite"
  }, [_c('div', [_vm._v("黑-暗")]), _vm._v(" "), _c('div', [_vm._v(".bgblack-darker")]), _vm._v(" "), _c('div', [_vm._v("#222")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgblack-darkest fwhite"
  }, [_c('div', [_vm._v("黑-最暗")]), _vm._v(" "), _c('div', [_vm._v(".bgblack-darkest")]), _vm._v(" "), _c('div', [_vm._v("#000")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock bggray-lighter"
  }, [_c('div', [_vm._v("灰-较亮")]), _vm._v(" "), _c('div', [_vm._v(".bggray-lighter")]), _vm._v(" "), _c('div', [_vm._v("#EEE")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bggray-light"
  }, [_c('div', [_vm._v("灰-亮")]), _vm._v(" "), _c('div', [_vm._v(".bggray-light")]), _vm._v(" "), _c('div', [_vm._v("#DDD")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bggray"
  }, [_c('div', [_vm._v("灰")]), _vm._v(" "), _c('div', [_vm._v(".bggray")]), _vm._v(" "), _c('div', [_vm._v("#CCC")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bggray-dark fwhite"
  }, [_c('div', [_vm._v("灰-暗")]), _vm._v(" "), _c('div', [_vm._v(".bggray-dark")]), _vm._v(" "), _c('div', [_vm._v("#BBB")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bggray-darker fwhite"
  }, [_c('div', [_vm._v("灰-较暗")]), _vm._v(" "), _c('div', [_vm._v(".bggray-darker")]), _vm._v(" "), _c('div', [_vm._v("#AAA")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bggray-darkest fwhite"
  }, [_c('div', [_vm._v("灰-最暗")]), _vm._v(" "), _c('div', [_vm._v(".bggray-darkest")]), _vm._v(" "), _c('div', [_vm._v("#999")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock empty"
  }), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgwhite-light"
  }, [_c('div', [_vm._v("白-亮")]), _vm._v(" "), _c('div', [_vm._v(".bgwhite-light")]), _vm._v(" "), _c('div', [_vm._v("#FFF")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock active bgwhite"
  }, [_c('div', [_vm._v("白")]), _vm._v(" "), _c('div', [_vm._v(".bgwhite")]), _vm._v(" "), _c('div', [_vm._v("#FAFAFA")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgwhite-dark"
  }, [_c('div', [_vm._v("白-暗")]), _vm._v(" "), _c('div', [_vm._v(".bgwhite-dark")]), _vm._v(" "), _c('div', [_vm._v("#F7F7F7")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgwhite-darker"
  }, [_c('div', [_vm._v("白-较暗")]), _vm._v(" "), _c('div', [_vm._v(".bgwhite-darker")]), _vm._v(" "), _c('div', [_vm._v("#F5F5F5")])]), _vm._v(" "), _c('div', {
    staticClass: "colorblock bgwhite-darkest"
  }, [_c('div', [_vm._v("白-最暗")]), _vm._v(" "), _c('div', [_vm._v(".bgwhite-darkest")]), _vm._v(" "), _c('div', [_vm._v("#F3F3F3")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', [_vm._v("我这个配色方案中还给出一些辅助色，参考一下得了")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#5ADBD3"
    }
  }, [_c('div', [_vm._v("#5ADBD3")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#ED0145"
    }
  }, [_c('div', [_vm._v("#ED0145")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#D13079"
    }
  }, [_c('div', [_vm._v("#D13079")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#710AAA"
    }
  }, [_c('div', [_vm._v("#710AAA")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#FF6000"
    }
  }, [_c('div', [_vm._v("#FF6000")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#FFBA73"
    }
  }, [_c('div', [_vm._v("#FFBA73")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('div', {
    staticClass: "colorblock-min",
    staticStyle: {
      "border-color": "#F8F1CE"
    }
  }, [_c('div', [_vm._v("#F8F1CE")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("文本")]), _vm._v(" "), _c('div', [_vm._v("深暗色调")]), _vm._v(" "), _c('div', [_vm._v(".ftheme | .fkey | .fnice | .fblack")]), _vm._v(" "), _c('ul', {
    staticClass: "textbox5"
  }, [_c('li', {
    staticClass: "ftheme"
  }, [_vm._v("Look inside")]), _vm._v(" "), _c('li', {
    staticClass: "ftheme"
  }, [_vm._v("看看")]), _vm._v(" "), _c('li', {
    staticClass: "ftheme"
  }, [_vm._v("Look inside your tiny mind")]), _vm._v(" "), _c('li', {
    staticClass: "ftheme"
  }, [_vm._v("看看你那浅薄的思想")])]), _vm._v(" "), _c('ul', {
    staticClass: "textbox5"
  }, [_c('li', {
    staticClass: "fkey"
  }, [_vm._v("then look a bit harder")]), _vm._v(" "), _c('li', {
    staticClass: "fkey"
  }, [_vm._v("放远大点吧")]), _vm._v(" "), _c('li', {
    staticClass: "fkey"
  }, [_vm._v("Cause we're so uninspired")]), _vm._v(" "), _c('li', {
    staticClass: "fkey"
  }, [_vm._v("因为那里装不下灵魂")])]), _vm._v(" "), _c('ul', {
    staticClass: "textbox5"
  }, [_c('li', {
    staticClass: "fnice"
  }, [_vm._v("So sick and tired of all the hatred you harbor")]), _vm._v(" "), _c('li', {
    staticClass: "fnice"
  }, [_vm._v("如此恶心另人厌倦 全是罪恨")]), _vm._v(" "), _c('li', {
    staticClass: "fnice"
  }, [_vm._v("So you say")]), _vm._v(" "), _c('li', {
    staticClass: "fnice"
  }, [_vm._v("所以你说")])]), _vm._v(" "), _c('ul', {
    staticClass: "textbox5"
  }, [_c('li', {
    staticClass: "fblack"
  }, [_vm._v("It's not okay to be gay")]), _vm._v(" "), _c('li', {
    staticClass: "fblack"
  }, [_vm._v("你不认同同性恋")]), _vm._v(" "), _c('li', {
    staticClass: "fblack"
  }, [_vm._v("Well I think you're just evil")]), _vm._v(" "), _c('li', {
    staticClass: "fblack"
  }, [_vm._v("然而我覺得你是個魔鬼")])]), _vm._v(" "), _c('div', [_vm._v("明亮色调")]), _vm._v(" "), _c('div', [_vm._v(".flight | .fwhite | .fgray")]), _vm._v(" "), _c('ul', {
    staticClass: "textbox10 bgimg-dark"
  }, [_c('li', {
    staticClass: "flight"
  }, [_vm._v("You're just some racist who can't tie my laces")]), _vm._v(" "), _c('li', {
    staticClass: "flight"
  }, [_vm._v("你就是一种种族歧视 連鞋帶都不配給我系")]), _vm._v(" "), _c('li', {
    staticClass: "flight"
  }, [_vm._v("Your point of view is medieval")]), _vm._v(" "), _c('li', {
    staticClass: "flight"
  }, [_vm._v("你的觀點已經過時")])]), _vm._v(" "), _c('ul', {
    staticClass: "textbox10 bgimg-dark"
  }, [_c('li', {
    staticClass: "fgray"
  }, [_vm._v("Fuck you (Fuck you)")]), _vm._v(" "), _c('li', {
    staticClass: "fgray"
  }, [_vm._v("去你的")]), _vm._v(" "), _c('li', {
    staticClass: "fgray"
  }, [_vm._v("Fuck you very, very much")]), _vm._v(" "), _c('li', {
    staticClass: "fgray"
  }, [_vm._v("真的是去你媽的")])]), _vm._v(" "), _c('ul', {
    staticClass: "textbox10 bgimg-dark"
  }, [_c('li', {
    staticClass: "fwhite"
  }, [_vm._v("Cause your words don't translate")]), _vm._v(" "), _c('li', {
    staticClass: "fwhite"
  }, [_vm._v("因为我们语言不通")]), _vm._v(" "), _c('li', {
    staticClass: "fwhite"
  }, [_vm._v("And it's getting quite late")]), _vm._v(" "), _c('li', {
    staticClass: "fwhite"
  }, [_vm._v("那只会耽误时间")])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-57f76d5a", esExports)
  }
}

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_grid_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_grid_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_grid_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_53fc9e1f_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_grid_vue__ = __webpack_require__(87);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(85)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_grid_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_53fc9e1f_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_grid_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-grid.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-grid.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53fc9e1f", Component.options)
  } else {
    hotAPI.reload("data-v-53fc9e1f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(15, function() {
			var newContent = __webpack_require__(15);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("布局")]), _vm._v(" "), _c('h3', [_vm._v(".grid .row .cell-5-1")]), _vm._v(" "), _c('div', [_vm._v("奇数等分，最小份为1/5")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-4"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("4")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-5"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("5")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".grid .row .cell-7-1")]), _vm._v(" "), _c('div', [_vm._v("奇数等分，最小份为1/7")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-4"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("4")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-5"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("5")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-6"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("6")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-7-7"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("7")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".grid .row .cell-12-1")]), _vm._v(" "), _c('div', [_vm._v("偶数等分，最小份为1/12")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("4")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("4")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("4")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-5"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("5")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-5"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("5")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("6")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("6")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-7"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("7")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-5"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("5")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-8"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("8")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("4")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-9"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("9")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-3"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("3")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-10"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("10")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("2")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-11"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("11")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("12")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".grid .grid-row-full")]), _vm._v(" "), _c('div', [_vm._v("无间隙")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row-full",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("嵌套布局")]), _vm._v(" "), _c('div', [_vm._v("通过.row的嵌套使用，可以完美实现10列和14列的布局")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "fillblock"
  }, [_vm._v("1")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".grid-btngroup")]), _vm._v(" "), _c('div', [_vm._v("参见按钮组部分文档")]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-53fc9e1f", esExports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_table_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_table_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_6b5e4c45_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_table_vue__ = __webpack_require__(91);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(89)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_table_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_6b5e4c45_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_table_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-table.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b5e4c45", Component.options)
  } else {
    hotAPI.reload("data-v-6b5e4c45", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(16, function() {
			var newContent = __webpack_require__(16);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("表格")]), _vm._v(" "), _c('h3', [_vm._v(".table")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "50px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table 默认状态")]), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_c('tr', [_c('td', [_vm._v("影片名")]), _vm._v(" "), _c('td', [_vm._v("主演")]), _vm._v(" "), _c('td', [_vm._v("类型")]), _vm._v(" "), _c('td', [_vm._v("地区")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超能陆战队")]), _vm._v(" "), _c('td', [_vm._v("斯科特·埃德希特、瑞恩·波特")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超体")]), _vm._v(" "), _c('td', [_vm._v("斯嘉丽·约翰逊")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v("使用th元素 表头样式")]), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("哆啦A梦:伴我同行")]), _vm._v(" "), _c('td', [_vm._v("水田山葵、大原惠美")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("杀破狼2")]), _vm._v(" "), _c('td', [_vm._v("托尼·贾、吴京")]), _vm._v(" "), _c('td', [_vm._v("犯罪")]), _vm._v(" "), _c('td', [_vm._v("大陆")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("匆匆那年")]), _vm._v(" "), _c('td', [_vm._v("倪妮、彭于晏")]), _vm._v(" "), _c('td', [_vm._v("爱情")]), _vm._v(" "), _c('td', [_vm._v("大陆")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "50px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table-line 行模式")]), _vm._v(" "), _c('table', {
    staticClass: "table table-line"
  }, [_c('caption', [_vm._v("今日热门影片")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("夏洛特烦恼")]), _vm._v(" "), _c('td', [_vm._v("沈腾、马丽")]), _vm._v(" "), _c('td', [_vm._v("喜剧")]), _vm._v(" "), _c('td', [_vm._v("大陆")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("西游记之大圣归来")]), _vm._v(" "), _c('td', [_vm._v("张磊、林子杰")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("大陆")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table-grid-border .table-grid 边框模式")]), _vm._v(" "), _c('div', {
    staticClass: "table-grid-border"
  }, [_c('table', {
    staticClass: "table table-grid"
  }, [_c('caption', [_vm._v("今日热门影片")]), _vm._v(" "), _c('thead', [_c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])])]), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', [_vm._v("超能陆战队")]), _vm._v(" "), _c('td', [_vm._v("斯科特·埃德希特、瑞恩·波特")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超体")]), _vm._v(" "), _c('td', [_vm._v("斯嘉丽·约翰逊")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])]), _vm._v(" "), _c('tfoot', [_c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "50px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table-diff 奇偶行区分模式")]), _vm._v(" "), _c('table', {
    staticClass: "table table-diff"
  }, [_c('caption', [_vm._v("今日热门影片")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超能陆战队")]), _vm._v(" "), _c('td', [_vm._v("斯科特·埃德希特、瑞恩·波特")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超体")]), _vm._v(" "), _c('td', [_vm._v("斯嘉丽·约翰逊")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table-hover 鼠标指向高亮")]), _vm._v(" "), _c('table', {
    staticClass: "table table-hover"
  }, [_c('caption', [_vm._v("今日热门影片")]), _vm._v(" "), _c('thead', [_c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("夏洛特烦恼")]), _vm._v(" "), _c('td', [_vm._v("沈腾、马丽")]), _vm._v(" "), _c('td', [_vm._v("喜剧")]), _vm._v(" "), _c('td', [_vm._v("大陆")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("西游记之大圣归来")]), _vm._v(" "), _c('td', [_vm._v("张磊、林子杰")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("大陆")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "50px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table-min 紧凑模式")]), _vm._v(" "), _c('table', {
    staticClass: "table table-grid table-min"
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])])]), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', [_vm._v("超能陆战队")]), _vm._v(" "), _c('td', [_vm._v("斯科特·埃德希特、瑞恩·波特")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超体")]), _vm._v(" "), _c('td', [_vm._v("斯嘉丽·约翰逊")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])]), _vm._v(" "), _c('tfoot', [_c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "50px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v(".table-full 宽度100%")]), _vm._v(" "), _c('div', {
    staticClass: "table-grid-border table-full"
  }, [_c('table', {
    staticClass: "table table-grid"
  }, [_c('caption', [_vm._v("今日热门影片")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("影片名")]), _vm._v(" "), _c('th', [_vm._v("主演")]), _vm._v(" "), _c('th', [_vm._v("类型")]), _vm._v(" "), _c('th', [_vm._v("地区")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超能陆战队")]), _vm._v(" "), _c('td', [_vm._v("斯科特·埃德希特、瑞恩·波特")]), _vm._v(" "), _c('td', [_vm._v("动画")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("超体")]), _vm._v(" "), _c('td', [_vm._v("斯嘉丽·约翰逊")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("星际穿越")]), _vm._v(" "), _c('td', [_vm._v("马修·麦康纳")]), _vm._v(" "), _c('td', [_vm._v("科幻")]), _vm._v(" "), _c('td', [_vm._v("美国")])])])])])])])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-6b5e4c45", esExports)
  }
}

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_button_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_button_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_721697cb_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_button_vue__ = __webpack_require__(95);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(93)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_button_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_721697cb_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_button_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-button.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-button.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-721697cb", Component.options)
  } else {
    hotAPI.reload("data-v-721697cb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(17, function() {
			var newContent = __webpack_require__(17);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("按钮")]), _vm._v(" "), _c('h3', [_vm._v(".btn")]), _vm._v(" "), _c('div', [_vm._v("buttn标签")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("default")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("默认")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn border"
  }, [_vm._v("边框")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn hover"
  }, [_vm._v("激活")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn active"
  }, [_vm._v("按下")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn loading"
  }, [_vm._v("繁忙")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', [_vm._v("a标签")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn"
  }, [_vm._v("default")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn"
  }, [_vm._v("默认")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn border"
  }, [_vm._v("边框")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn hover"
  }, [_vm._v("激活")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn active"
  }, [_vm._v("按下")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn loading"
  }, [_vm._v("繁忙")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('a', {
    staticClass: "btn",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btn-inverse")]), _vm._v(" "), _c('div', [_vm._v("反色按钮")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse"
  }, [_vm._v("inverse")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse"
  }, [_vm._v("反色")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse border"
  }, [_vm._v("边框")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse hover"
  }, [_vm._v("激活")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse active"
  }, [_vm._v("按下")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse loading"
  }, [_vm._v("繁忙")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-inverse",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btn-border")]), _vm._v(" "), _c('div', [_vm._v("边框按钮")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid bgimg-dark",
    staticStyle: {
      "padding": "20px"
    }
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border"
  }, [_vm._v("border")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border"
  }, [_vm._v("默认")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border hover"
  }, [_vm._v("激活")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border active"
  }, [_vm._v("按下")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border loading"
  }, [_vm._v("繁忙")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btn-border-inverse")]), _vm._v(" "), _c('div', [_vm._v("反色边框按钮")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid bgimg-light",
    staticStyle: {
      "padding": "20px"
    }
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border-inverse"
  }, [_vm._v("inverse")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border-inverse"
  }, [_vm._v("默认")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border-inverse hover"
  }, [_vm._v("激活")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border-inverse active"
  }, [_vm._v("按下")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border-inverse loading"
  }, [_vm._v("繁忙")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-border-inverse",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btn-link")]), _vm._v(" "), _c('div', [_vm._v("链接按钮")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-link"
  }, [_vm._v("link")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-link"
  }, [_vm._v("链接")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-link hover"
  }, [_vm._v("激活")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-link active"
  }, [_vm._v("按下")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-link loading"
  }, [_vm._v("繁忙")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-link",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btn-theme | .btn-key | .btn-light | .btn-nice")]), _vm._v(" "), _c('div', [_vm._v("其他风格按钮")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-theme"
  }, [_vm._v("主题")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-key"
  }, [_vm._v("关键")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-light"
  }, [_vm._v("闪亮")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }, [_c('button', {
    staticClass: "btn btn-nice"
  }, [_vm._v("友好")])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btn-big | .btn-min")]), _vm._v(" "), _c('div', [_vm._v("大尺寸、小尺寸")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-7-2"
  }, [_c('a', {
    staticClass: "btn btn-big"
  }, [_vm._v("大尺寸按钮")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-2"
  }, [_c('a', {
    staticClass: "btn btn-min"
  }, [_vm._v("小尺寸按钮")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  }), _vm._v(" "), _c('div', {
    staticClass: "cell-7-1"
  })])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("自定义尺寸")]), _vm._v(" "), _c('div', [_vm._v("自定义高度后，垂直居中问题，目前只能通过line-hight来解决")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_c('a', {
    staticClass: "btn",
    staticStyle: {
      "height": "80px"
    }
  }, [_vm._v("默认状态")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('a', {
    staticClass: "btn",
    staticStyle: {
      "height": "80px",
      "line-height": "62px"
    }
  }, [_vm._v("设置行高")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('a', {
    staticClass: "btn btn-min",
    staticStyle: {
      "height": "80px",
      "line-height": "66px"
    }
  }, [_vm._v("小尺寸按钮")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('a', {
    staticClass: "btn btn-big",
    staticStyle: {
      "height": "80px",
      "line-height": "58px"
    }
  }, [_vm._v("大尺寸按钮")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  })])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("块级元素")]), _vm._v(" "), _c('div', [_vm._v("宽度100%")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row-full",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('a', {
    staticClass: "btn btn-big btn-theme btn-full"
  }, [_vm._v("提交")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('a', {
    staticClass: "btn btn-big btn-full"
  }, [_vm._v("取消")])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-5-5"
  }, [_c('a', {
    staticClass: "btn btn-big btn-inverse btn-full"
  }, [_vm._v("浏览更多")])])])]), _vm._v(" "), _c('br')]), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("按钮组")]), _vm._v(" "), _c('h3', [_vm._v(".btngroup")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("左栏")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("右栏")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_vm._v(" ")]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  })])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btngroup-list")]), _vm._v(" "), _c('div', [_vm._v(".btngroup-list默认为块元素，可自定义设置宽度")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "btngroup btngroup-list"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("顶栏")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("底栏")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_vm._v(" ")]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "btngroup btngroup-list",
    staticStyle: {
      "width": "160px"
    }
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("顶栏")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")]), _vm._v(" "), _c('button', {
    staticClass: "btn"
  }, [_vm._v("底栏")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btngroup-table > .btn")]), _vm._v(" "), _c('div', [_vm._v(".btn只能使用a标签")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticClass: "btngroup btngroup-table"
  }, [_c('a', {
    staticClass: "btn",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("左栏")]), _vm._v(" "), _c('a', {
    staticClass: "btn",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("中间")]), _vm._v(" "), _c('a', {
    staticClass: "btn",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("右栏")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btngroup-table > .btngroup > .btn")]), _vm._v(" "), _c('div', [_vm._v("由于button标签不支持table-cell两端对齐，必须多嵌套一层.btngroup")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticClass: "btngroup btngroup-table"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("左栏")])]), _vm._v(" "), _c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")])]), _vm._v(" "), _c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("右栏")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".grid-btngroup .grid-row .btn")]), _vm._v(" "), _c('div', [_vm._v("如果嫌弃按钮间的边框无法重叠，可以使用.grid-full模拟（可是便不能根据数量动态变更，而渲染样式了）")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid grid-btngroup"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("左栏")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("中间")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("右栏")])])])])]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-721697cb", esExports)
  }
}

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_popmenu_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_popmenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_popmenu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_06150ae7_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_popmenu_vue__ = __webpack_require__(99);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_popmenu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_06150ae7_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_popmenu_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-popmenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-popmenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06150ae7", Component.options)
  } else {
    hotAPI.reload("data-v-06150ae7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(18, function() {
			var newContent = __webpack_require__(18);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("气泡菜单")]), _vm._v(" "), _c('h3', [_vm._v(".popmenu")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("后退")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("暂停")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item selected"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("前进")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("弹出")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("字幕")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  })]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu popmenu-selectable"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("名称排序")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("价格排序")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item disabled"
  }, [_vm._v("信用排序")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item selected"
  }, [_vm._v("倒序")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("正序")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("复制")]), _vm._v(" "), _c('div', {
    staticClass: "md"
  }), _vm._v(" "), _c('div', {
    staticClass: "ft"
  }, [_c('small', [_vm._v("Ctrl + C")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("剪切")]), _vm._v(" "), _c('div', {
    staticClass: "md"
  }), _vm._v(" "), _c('div', {
    staticClass: "ft"
  }, [_c('small', [_vm._v("Ctrl + X")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item selected"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("粘贴")]), _vm._v(" "), _c('div', {
    staticClass: "md"
  }), _vm._v(" "), _c('div', {
    staticClass: "ft"
  }, [_c('small', [_vm._v("Ctrl + V")])])]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("字体")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("颜色")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("复制")]), _vm._v(" "), _c('div', {
    staticClass: "md"
  }), _vm._v(" "), _c('div', {
    staticClass: "ft"
  }, [_c('label', [_vm._v("99")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("剪切")]), _vm._v(" "), _c('div', {
    staticClass: "md"
  }), _vm._v(" "), _c('div', {
    staticClass: "ft"
  }, [_c('label', [_vm._v("99")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item selected"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("粘贴")]), _vm._v(" "), _c('div', {
    staticClass: "md"
  }), _vm._v(" "), _c('div', {
    staticClass: "ft"
  }, [_c('label', [_vm._v("99")])])]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("字体")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("颜色")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".popmenu-icon")]), _vm._v(" "), _c('div', [_vm._v("自定义图标")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu popmenu-icon"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-user-inverse"
  }), _vm._v(" "), _c('span', [_vm._v("用户中心")])]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-lock"
  }), _vm._v(" "), _c('span', [_vm._v("修改密码")])]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('span', [_vm._v("我的收藏")])]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-setting-inverse"
  }), _vm._v(" "), _c('span', [_vm._v("设置")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("popmenu .popmenu-sub .popmenu-item")]), _vm._v(" "), _c('div', [_vm._v("多级嵌套菜单，向左弹出.popmenu-tree-left，向上弹出.popmenu-tree-top，显示箭头.hassub")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu popmenu-tree"
  }, [_c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("市场部门")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("部门一")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("宣传组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("策划组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("公关组")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("部门二")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("宣传组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("策划组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("公关组")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("技术部")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("前端")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("设计组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("交互组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("程序组")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("后端")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("架构")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("业务组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("数据组")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item disabled"
  }, [_vm._v("财务部")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("秘书处")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("总经办")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu popmenu-tree-left popmenu-tree-top"
  }, [_c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("市场部门")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("部门一")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("宣传组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("策划组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("公关组")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("部门二")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("宣传组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("策划组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("公关组")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("技术部")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("前端")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("设计组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("交互组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("程序组")])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item hassub"
  }, [_c('span', [_vm._v("后端")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-sub"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("架构")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("业务组")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("数据组")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item disabled"
  }, [_vm._v("财务部")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("秘书处")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_vm._v("总经办")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".popmenu-big | .popmenu-min")]), _vm._v(" "), _c('div', [_vm._v("大尺寸、小尺寸")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu popmenu-min"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "popmenu popmenu-big"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4 demo-popmenuopen"
  })])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".btngroup .btn-popmenu .popmenu")]), _vm._v(" "), _c('div', [_vm._v("弹出菜单按钮组，.popmenu必须放在.btngroup子元素的最后")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn btn-last btn-popmenu"
  }, [_c('span', [_vm._v("默认")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down-min"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu active"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn btn-last btn-popmenu active"
  }, [_c('span', [_vm._v("激活")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down-min"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu active"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn btn-popmenu-icon"
  }, [_c('i', {
    staticClass: "iconfont icon-down-min"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-last"
  }, [_vm._v("提交")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("提交")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-last btn-popmenu-icon btn-popmenu-left btn-popmenu-top"
  }, [_c('i', {
    staticClass: "iconfont icon-up-min"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  })]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "btngroup btngroup-full"
  }, [_c('button', {
    staticClass: "btn btn-last btn-full btn-popmenu active"
  }, [_c('span', [_vm._v("自适应按钮组100%宽度")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down-min"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu popmenu-full active"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "btngroup"
  }, [_c('button', {
    staticClass: "btn btn-last btn-popmenu active"
  }, [_c('span', [_vm._v("内容居中")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down-min"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu popmenu-full active"
  }, [_c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("后退")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("暂停")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("前进")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("弹出")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })]), _vm._v(" "), _c('div', {
    staticClass: "popmenu-item"
  }, [_c('div', {
    staticClass: "hd"
  }), _vm._v(" "), _c('div', {
    staticClass: "md"
  }, [_vm._v("字幕")]), _vm._v(" "), _c('div', {
    staticClass: "ft"
  })])])])])])]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-06150ae7", esExports)
  }
}

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_check_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_check_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_check_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0cb26f02_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_check_vue__ = __webpack_require__(103);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_check_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0cb26f02_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_check_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-check.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-check.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0cb26f02", Component.options)
  } else {
    hotAPI.reload("data-v-0cb26f02", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(19, function() {
			var newContent = __webpack_require__(19);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("单选、复选")]), _vm._v(" "), _c('h3', [_vm._v(".checkbox .radiobox")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("默认")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox hover"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("激活")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("选中")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox disabled"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "30px"
    }
  }, [_c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group2",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("默认")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio hover"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group2",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("激活")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group2",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("选中")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio disabled"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group2",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("禁用")])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "30px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("煎饼")])]), _vm._v(" "), _c('label', {
    staticClass: "checkbox checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("烧饼")])]), _vm._v(" "), _c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("炊饼")])]), _vm._v(" "), _c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("铁饼")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('label', {
    staticClass: "radio"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("胖子")])]), _vm._v(" "), _c('label', {
    staticClass: "radio"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("老子")])]), _vm._v(" "), _c('label', {
    staticClass: "radio checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("腰子")])]), _vm._v(" "), _c('label', {
    staticClass: "radio"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("鬼子")])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "30px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('label', {
    staticClass: "checkbox checkbox-full"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("煎饼")])]), _vm._v(" "), _c('label', {
    staticClass: "checkbox checkbox-full checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("烧饼")])]), _vm._v(" "), _c('label', {
    staticClass: "checkbox checkbox-full"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("炊饼")])]), _vm._v(" "), _c('label', {
    staticClass: "checkbox checkbox-full"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group3",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("铁饼")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('label', {
    staticClass: "radio radio-full"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("胖子")])]), _vm._v(" "), _c('label', {
    staticClass: "radio radio-full"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("老子")])]), _vm._v(" "), _c('label', {
    staticClass: "radio radio-full checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("腰子")])]), _vm._v(" "), _c('label', {
    staticClass: "radio radio-full"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group4",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("鬼子")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".checkbox-theme .radio-theme | *-key  | *-light  | *-nice ")]), _vm._v(" "), _c('div', [_vm._v("其他风格按钮")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox checkbox-theme checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("主题")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox checkbox-key checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("关键")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox checkbox-light checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("闪亮")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "checkbox checkbox-nice checked"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "group1",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("友好")])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio radio-theme checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group1",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("主题")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio radio-key checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group1",
      "value": "2"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("关键")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio radio-light checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group1",
      "value": "3"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("闪亮")])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('label', {
    staticClass: "radio radio-nice checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": "group1",
      "value": "4"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("友好")])])])])]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-0cb26f02", esExports)
  }
}

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_select_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_select_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_select_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0bf89ed6_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_select_vue__ = __webpack_require__(107);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_select_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0bf89ed6_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_select_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-select.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-select.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bf89ed6", Component.options)
  } else {
    hotAPI.reload("data-v-0bf89ed6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(20, function() {
			var newContent = __webpack_require__(20);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("下拉框")]), _vm._v(" "), _c('h3', [_vm._v(".select")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid",
    staticStyle: {
      "margin": "150px 0px 350px"
    }
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-2"
  }, [_c('div', {
    staticClass: "select"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "disabled": "",
      "type": "text",
      "placeholder": "请选择",
      "value": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('div', {
    staticClass: "select active"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": "北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京北京",
      "readonly": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item disabled",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "split"
  }), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item disabled",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('div', {
    staticClass: "select active"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": "上海"
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京北京北京北京北京北京北京北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item selected",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-2"
  }, [_c('div', {
    staticClass: "select active top"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": "上海"
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item selected",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])])])]), _vm._v(" "), _c('h3', [_vm._v(".select-big | .select-min")]), _vm._v(" "), _c('div', [_vm._v("大尺寸、小尺寸")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid",
    staticStyle: {
      "margin-bottom": "150px"
    }
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn btn-min"
  }, [_vm._v("参照按钮")]), _vm._v(" "), _c('div', {
    staticClass: "select select-min active"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("参照按钮")]), _vm._v(" "), _c('div', {
    staticClass: "select active"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn btn-big"
  }, [_vm._v("参照按钮")]), _vm._v(" "), _c('div', {
    staticClass: "select select-big active"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": "北京",
      "readonly": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])])])]), _vm._v(" "), _c('h3', [_vm._v("块级元素")]), _vm._v(" "), _c('div', [_vm._v("宽度100%")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row-full",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('a', {
    staticClass: "btn btn-big btn-theme btn-full"
  }, [_vm._v("提交")])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "select select-big select-full select-center top"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": "北京",
      "readonly": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "200px"
    }
  }, [_c('div', {
    staticClass: "cell-5-5"
  }, [_c('div', {
    staticClass: "select select-big select-full active"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "请选择",
      "value": "北京",
      "readonly": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])])])])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-0bf89ed6", esExports)
  }
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tabs_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tabs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tabs_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0c036a57_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_tabs_vue__ = __webpack_require__(111);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(109)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tabs_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0c036a57_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_tabs_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-tabs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-tabs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c036a57", Component.options)
  } else {
    hotAPI.reload("data-v-0c036a57", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(21, function() {
			var newContent = __webpack_require__(21);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("标签页")]), _vm._v(" "), _c('h3', [_vm._v(".tabs")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "tabs"
  }, [_c('ul', {
    staticClass: "tabs-navs"
  }, [_c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("参数")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav active"
  }, [_vm._v("详情")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("评论")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("图册")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("更多 "), _c('i', {
    staticClass: "iconfont icon-right-min"
  })])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".tabs.tabs-min")]), _vm._v(" "), _c('div', [_vm._v("小尺寸")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "tabs tabs-min"
  }, [_c('ul', {
    staticClass: "tabs-navs"
  }, [_c('li', {
    staticClass: "tabs-nav active"
  }, [_vm._v("红色")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("蓝色")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("黑色")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("其他 "), _c('i', {
    staticClass: "iconfont icon-right-min"
  })])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".tabs .tabs-nav-popmenu .popmenu")]), _vm._v(" "), _c('div', [_vm._v("弹出气泡菜单")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-6 demo-popmenuopen"
  }, [_c('div', {
    staticClass: "tabs tabs-min"
  }, [_c('ul', {
    staticClass: "tabs-navs"
  }, [_c('li', {
    staticClass: "tabs-nav active"
  }, [_vm._v("首页")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("基本信息")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav"
  }, [_vm._v("详情")]), _vm._v(" "), _c('li', {
    staticClass: "tabs-nav tabs-nav-popmenu active"
  }, [_c('span', [_vm._v("更多")]), _vm._v(" "), _c('div', {
    staticClass: "popmenu active"
  }, [_c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("新建")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("打开")]), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('div', {
    staticClass: "split"
  }), _vm._v(" "), _c('a', {
    staticClass: "popmenu-item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_vm._v("退出")])])])])])])])]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-0c036a57", esExports)
  }
}

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tag_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_a412945e_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_tag_vue__ = __webpack_require__(115);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_tag_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_a412945e_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_tag_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-tag.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-tag.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a412945e", Component.options)
  } else {
    hotAPI.reload("data-v-a412945e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(22, function() {
			var newContent = __webpack_require__(22);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("标签")]), _vm._v(" "), _c('h3', [_vm._v(".tag")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-5"
  }, [_c('p', {
    staticClass: "fsize-32"
  }, [_vm._v("\n                            据说这是一份最好吃的中国披萨 "), _c('span', {
    staticClass: "tag"
  }, [_vm._v("煎饼果子")])]), _vm._v(" "), _c('p', {
    staticClass: "fsize-26"
  }, [_vm._v("\n                            据说这是一份最好吃的中国披萨 "), _c('span', {
    staticClass: "tag"
  }, [_vm._v("煎饼果子")])]), _vm._v(" "), _c('p', {
    staticClass: "fsize-18"
  }, [_vm._v("\n                            据说这是一份最好吃的中国披萨 "), _c('span', {
    staticClass: "tag"
  }, [_vm._v("煎饼果子")])]), _vm._v(" "), _c('p', {
    staticClass: "fsize-14"
  }, [_vm._v("\n                            据说这是一份最好吃的中国披萨 "), _c('span', {
    staticClass: "tag"
  }, [_vm._v("煎饼果子")])]), _vm._v(" "), _c('p', {
    staticClass: "fsize-12"
  }, [_vm._v("\n                            据说这是一份最好吃的中国披萨 "), _c('span', {
    staticClass: "tag"
  }, [_vm._v("煎饼果子")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".tag-theme | .tag-key | .tag-light | .tag-nice ")]), _vm._v(" "), _c('div', [_vm._v("其他风格")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-5"
  }, [_c('p', {
    staticClass: "fsize-14"
  }, [_vm._v("\n                            老板，我要\n                            "), _c('span', {
    staticClass: "tag tag-theme"
  }, [_vm._v("香菜")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-key"
  }, [_vm._v("火腿")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-light"
  }, [_vm._v("煎鸡蛋")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-nice"
  }, [_vm._v("生菜")])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".tag-circle ")]), _vm._v(" "), _c('div', [_vm._v("椭圆")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-5"
  }, [_c('p', {
    staticClass: "fsize-14"
  }, [_c('span', {
    staticClass: "tag tag-circle tag-theme"
  }, [_vm._v("套餐一")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-circle tag-key"
  }, [_vm._v("套餐二")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-circle tag-light"
  }, [_vm._v("套餐三")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-circle tag-nice"
  }, [_vm._v("套餐四")]), _vm._v(" "), _c('span', {
    staticClass: "tag tag-circle"
  }, [_vm._v("9")])])])])]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-a412945e", esExports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_input_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_input_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_input_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_47a30a41_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_input_vue__ = __webpack_require__(119);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(117)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_input_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_47a30a41_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_input_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-input.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-input.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47a30a41", Component.options)
  } else {
    hotAPI.reload("data-v-47a30a41", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(23, function() {
			var newContent = __webpack_require__(23);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("输入框")]), _vm._v(" "), _c('h3', [_vm._v(".input")]), _vm._v(" "), _c('div', [_vm._v("默认样式（HTML5新类型各个浏览器支持程度不同）。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "default",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "默认",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('input', {
    staticClass: "input active",
    attrs: {
      "type": "text",
      "value": "激活",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "只读",
      "readonly": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "禁用",
      "disabled": ""
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        text："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        password："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "password",
      "value": "",
      "placeholder": "请输入密码"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        number："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        search："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "search",
      "value": "",
      "placeholder": "搜索关键字"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        email："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "email",
      "value": "",
      "placeholder": "邮件地址"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        month："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "month",
      "value": "",
      "placeholder": "月份"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        date："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "date",
      "value": "",
      "placeholder": "日期"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        time："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "time",
      "value": "",
      "placeholder": "时间"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        week："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "week",
      "value": "",
      "placeholder": "第几周"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        url："), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "url",
      "value": "",
      "placeholder": "网址"
    }
  })])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".input-theme | .input-key | .input-light | .input-nice")]), _vm._v(" "), _c('div', [_vm._v("其他风格输入框")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        theme："), _c('input', {
    staticClass: "input input-theme",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        key："), _c('input', {
    staticClass: "input input-key",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        light："), _c('input', {
    staticClass: "input input-light",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        nice："), _c('input', {
    staticClass: "input input-nice",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  })]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        active："), _c('input', {
    staticClass: "input input-theme active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        active："), _c('input', {
    staticClass: "input input-key active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        active："), _c('input', {
    staticClass: "input input-light active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  }, [_vm._v("\n                        active："), _c('input', {
    staticClass: "input input-nice active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-5-1"
  })])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".input-min | .input-big")]), _vm._v(" "), _c('div', [_vm._v("大尺寸、小尺寸")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn btn-min"
  }, [_vm._v("参照按钮")]), _vm._v(" "), _c('input', {
    staticClass: "input input-min",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("参照按钮")]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('button', {
    staticClass: "btn btn-big"
  }, [_vm._v("参照按钮")]), _vm._v(" "), _c('input', {
    staticClass: "input input-big",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".input-full")]), _vm._v(" "), _c('div', [_vm._v("宽度100%")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('input', {
    staticClass: "input input-min input-full",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('input', {
    staticClass: "input input-theme input-full active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "请输入"
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("组合输入框")]), _vm._v(" "), _c('h3', [_vm._v(".inputgroup .addons .text")]), _vm._v(" "), _c('div', [_vm._v("组合输入框")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('div', {
    staticClass: "addons"
  }, [_c('span', {
    staticClass: "text"
  }, [_vm._v("￥")])]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('span', {
    staticClass: "text"
  }, [_vm._v("元")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('span', {
    staticClass: "text"
  }, [_vm._v("元")]), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("（人民币）")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn border"
  }, [_vm._v("搜索")])]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('input', {
    staticClass: "input input-theme",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn btn-theme border"
  }, [_vm._v("搜索")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('input', {
    staticClass: "input input-theme active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn btn-theme border"
  }, [_vm._v("搜索")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("大尺寸、小尺寸")]), _vm._v(" "), _c('div', [_vm._v("*-min | *-big")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('input', {
    staticClass: "input input-min",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('span', {
    staticClass: "text text-min"
  }, [_vm._v("元")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('div', {
    staticClass: "addons"
  }, [_c('span', {
    staticClass: "text"
  }, [_vm._v("￥")])]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-4"
  }, [_c('div', {
    staticClass: "inputgroup"
  }, [_c('input', {
    staticClass: "input input-big",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "数值"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('span', {
    staticClass: "text text-big"
  }, [_vm._v("元")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("自定义宽度")]), _vm._v(" "), _c('div', [_vm._v("设置.inputgroup元素的宽度")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticClass: "inputgroup",
    staticStyle: {
      "width": "528px"
    }
  }, [_c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn btn-theme border"
  }, [_vm._v("搜索")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme border",
    staticStyle: {
      "padding": "8px 3px"
    }
  }, [_c('i', {
    staticClass: "iconfont icon-down-min"
  })])]), _vm._v(" "), _c('input', {
    staticClass: "input input-theme active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  })])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".inputgroup-full")]), _vm._v(" "), _c('div', [_vm._v("宽度100%")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticClass: "inputgroup inputgroup-full"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn border"
  }, [_vm._v("搜索")]), _vm._v(" "), _c('button', {
    staticClass: "btn border"
  }, [_vm._v("其他")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticClass: "inputgroup inputgroup-full"
  }, [_c('input', {
    staticClass: "input input-theme",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn btn-theme border"
  }, [_vm._v("搜索")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme border"
  }, [_vm._v("其他")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme border",
    staticStyle: {
      "padding": "8px 3px"
    }
  }, [_c('i', {
    staticClass: "iconfont icon-down-min"
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row",
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "cell-12-12"
  }, [_c('div', {
    staticClass: "inputgroup inputgroup-full"
  }, [_c('div', {
    staticClass: "addons"
  }, [_c('button', {
    staticClass: "btn btn-theme btn-big border"
  }, [_c('i', {
    staticClass: "iconfont icon-search"
  }), _vm._v(" 搜索")])]), _vm._v(" "), _c('input', {
    staticClass: "input input-theme input-big active",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "搜索关键字"
    }
  })])])])])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-47a30a41", esExports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_form_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_5d43309d_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_form_vue__ = __webpack_require__(123);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(121)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_form_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_5d43309d_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_form_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d43309d", Component.options)
  } else {
    hotAPI.reload("data-v-5d43309d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(24, function() {
			var newContent = __webpack_require__(24);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("表单")]), _vm._v(" "), _c('h3', [_vm._v(".form .formitem")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('form', {
    staticClass: "form",
    attrs: {
      "action": "",
      "method": "post",
      "novalidate": "novalidate"
    }
  }, [_c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("账号 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "邮箱或手机"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("密码 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "登录密码"
    }
  }), _vm._v(" "), _c('small', [_vm._v("忘记密码，可以联系客服咨询。")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding-left": "85px"
    }
  }, [_c('label', {
    staticClass: "checkbox checkbox-theme checkbox-min checkbox-full"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "id": "autologin",
      "name": "autologin",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("30天免登录")])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("立即登录")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".form .formsub .formitem")]), _vm._v(" "), _c('div', [_vm._v("字段分组")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('form', {
    staticClass: "form",
    attrs: {
      "action": "",
      "method": "post",
      "novalidate": "novalidate"
    }
  }, [_c('div', {
    staticClass: "formsub"
  }, [_c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("用户名 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "昵称"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("电话 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "number",
      "value": "",
      "placeholder": "手机号码"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "formsub"
  }, [_c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("性别")]), _vm._v(" "), _c('label', {
    staticClass: "radio radio-theme checked"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "id": "formgender1",
      "name": "formgender",
      "value": "man",
      "checked": ""
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("男")])]), _vm._v(" "), _c('label', {
    staticClass: "radio radio-theme"
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "id": "formgender2",
      "name": "formgender",
      "value": "woman"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio-text"
  }, [_vm._v("女")])])]), _vm._v(" "), _c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("所在地区")]), _vm._v(" "), _c('div', {
    staticClass: "select",
    staticStyle: {
      "margin-right": "10px"
    }
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "省份",
      "value": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("四川")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("浙江")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("内蒙古")])])]), _vm._v(" "), _c('div', {
    staticClass: "select"
  }, [_c('div', {
    staticClass: "select-box"
  }, [_c('input', {
    staticClass: "select-text",
    attrs: {
      "type": "text",
      "placeholder": "城市",
      "value": ""
    }
  })]), _vm._v(" "), _c('ul', {
    staticClass: "select-list"
  }, [_c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "beijing"
    }
  }, [_vm._v("北京")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shanghai"
    }
  }, [_vm._v("上海")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "guangzhou"
    }
  }, [_vm._v("广州")]), _vm._v(" "), _c('li', {
    staticClass: "select-item",
    attrs: {
      "value": "shenzhen"
    }
  }, [_vm._v("深圳")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "formsub"
  }, [_c('div', {
    staticClass: "formitem"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("个人简介")]), _vm._v(" "), _c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "个人资料"
    }
  })])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding-left": "85px"
    }
  }, [_c('button', {
    staticClass: "btn btn-theme",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("保存")])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".form .formitem-line")]), _vm._v(" "), _c('div', [_vm._v("行模式")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-8"
  }, [_c('form', {
    staticClass: "form",
    attrs: {
      "action": "",
      "method": "post",
      "novalidate": "novalidate"
    }
  }, [_c('div', {
    staticClass: "formsub"
  }, [_c('div', {
    staticClass: "formitem-line"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("账号 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input input-full",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "邮箱或手机"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "formitem-line"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("旧密码 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input input-full",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "登录密码"
    }
  }), _vm._v(" "), _c('small', [_vm._v("忘记密码，可以联系客服咨询。")])])]), _vm._v(" "), _c('div', {
    staticClass: "formsub"
  }, [_c('div', {
    staticClass: "formitem-line"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("新密码 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input input-full",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "6~30位数字、字母或特殊符号"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "formitem-line"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("确认密码 "), _c('i', {
    staticClass: "must"
  })]), _vm._v(" "), _c('input', {
    staticClass: "input input-full",
    attrs: {
      "type": "text",
      "value": "",
      "placeholder": "再次输入新密码"
    }
  })])]), _vm._v(" "), _c('div', [_c('label', {
    staticClass: "checkbox checkbox-theme checkbox-min checkbox-full"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "id": "autologin",
      "name": "autologin",
      "value": "1"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox-text"
  }, [_vm._v("同意《账号安全管理协议》条款")])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("确定提交")])])])])])])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-5d43309d", esExports)
  }
}

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_dialog_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_dialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_dialog_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0a2972e1_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_dialog_vue__ = __webpack_require__(127);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_dialog_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_0a2972e1_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_dialog_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a2972e1", Component.options)
  } else {
    hotAPI.reload("data-v-0a2972e1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(25, function() {
			var newContent = __webpack_require__(25);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("遮罩层")]), _vm._v(" "), _c('h3', [_vm._v(".mask")]), _vm._v(" "), _c('div'), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-6"
  }, [_c('div', {
    staticClass: "mask hide"
  })])])]), _vm._v(" "), _c('br')]), _vm._v(" "), _c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("对话框")]), _vm._v(" "), _c('h3', [_vm._v(".dlg")]), _vm._v(" "), _c('div', [_vm._v("由于主张简洁统一的交互语言，这里的对话框都是模态。（如果需要非模态对话框，可以自己写一个，其实也很简单）")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-6 demo-dlg"
  }, [_c('div', {
    staticClass: "dlg"
  }, [_c('div', {
    staticClass: "mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "dlg-container"
  }, [_c('div', {
    staticClass: "dlg-head"
  }, [_c('div', {
    staticClass: "dlg-title"
  }, [_vm._v("对话框标题")]), _vm._v(" "), _c('button', {
    staticClass: "dlg-close"
  })]), _vm._v(" "), _c('div', {
    staticClass: "dlg-body"
  }, [_vm._v("\n                                    这里是内容区...\n                                ")]), _vm._v(" "), _c('div', {
    staticClass: "dlg-foot"
  }, [_c('div', {
    staticClass: "fright"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("取消")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme"
  }, [_vm._v("确认")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6 demo-dlg"
  }, [_c('div', {
    staticClass: "dlg dlg-nomask"
  }, [_c('div', {
    staticClass: "mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "dlg-container"
  }, [_c('div', {
    staticClass: "dlg-head"
  }, [_c('div', {
    staticClass: "dlg-title"
  }, [_vm._v("对话框标题")]), _vm._v(" "), _c('button', {
    staticClass: "dlg-close"
  })]), _vm._v(" "), _c('div', {
    staticClass: "dlg-body"
  }, [_vm._v("\n                                    这里是内容区...\n                                ")]), _vm._v(" "), _c('div', {
    staticClass: "dlg-foot"
  }, [_c('div', {
    staticClass: "fright"
  }, [_c('button', {
    staticClass: "btn"
  }, [_vm._v("取消")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-theme"
  }, [_vm._v("确认")])])])])])])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(".dlg-alert | .dlg-confirm | .dlg-prompt")]), _vm._v(" "), _c('div', [_vm._v("提示框、确认框、输入框")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row-full"
  }, [_c('div', {
    staticClass: "cell-12-6 demo-dlg"
  }, [_c('div', {
    staticClass: "dlg dlg-alert"
  }, [_c('div', {
    staticClass: "mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "dlg-container"
  }, [_c('div', {
    staticClass: "dlg-body"
  }, [_vm._v("\n                                    信息保存成功\n                                ")]), _vm._v(" "), _c('div', {
    staticClass: "dlg-foot"
  }, [_c('button', {
    staticClass: "btn dlg-ok"
  }, [_vm._v("确认")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6 demo-dlg"
  }, [_c('div', {
    staticClass: "dlg dlg-confirm"
  }, [_c('div', {
    staticClass: "mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "dlg-container"
  }, [_c('div', {
    staticClass: "dlg-body"
  }, [_vm._v("\n                                    确定要删除吗？\n                                ")]), _vm._v(" "), _c('div', {
    staticClass: "dlg-foot"
  }, [_c('button', {
    staticClass: "btn dlg-cancel"
  }, [_vm._v("取消")]), _vm._v(" "), _c('button', {
    staticClass: "btn dlg-yes"
  }, [_vm._v("确认")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "grid-row-full"
  }, [_c('div', {
    staticClass: "cell-12-6 demo-dlg"
  }, [_c('div', {
    staticClass: "dlg dlg-prompt"
  }, [_c('div', {
    staticClass: "mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "dlg-container"
  }, [_c('div', {
    staticClass: "dlg-body"
  }, [_c('label', {
    staticClass: "dlg-label"
  }, [_vm._v("用户手机号码")]), _vm._v(" "), _c('input', {
    staticClass: "input input-full dlg-input",
    attrs: {
      "type": "text",
      "name": "",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "dlg-foot"
  }, [_c('button', {
    staticClass: "btn dlg-cancel"
  }, [_vm._v("取消")]), _vm._v(" "), _c('button', {
    staticClass: "btn dlg-yes"
  }, [_vm._v("确认")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "cell-12-6 demo-dlg"
  }, [_c('div', {
    staticClass: "dlg dlg-prompt"
  }, [_c('div', {
    staticClass: "mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "dlg-container"
  }, [_c('div', {
    staticClass: "dlg-body"
  }, [_c('label', {
    staticClass: "dlg-label"
  }, [_vm._v("个性签名")]), _vm._v(" "), _c('textarea', {
    staticClass: "textarea textarea-full dlg-textarea",
    attrs: {
      "type": "text",
      "name": "",
      "value": "",
      "placeholder": "请输入"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "dlg-foot"
  }, [_c('button', {
    staticClass: "btn dlg-cancel"
  }, [_vm._v("取消")]), _vm._v(" "), _c('button', {
    staticClass: "btn dlg-yes"
  }, [_vm._v("确认")])])])])])])]), _vm._v(" "), _c('br')])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-0a2972e1", esExports)
  }
}

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_icons_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_icons_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_icons_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_dfe044de_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_icons_vue__ = __webpack_require__(131);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_theme_icons_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_dfe044de_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_theme_icons_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\admin\\theme-icons.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] theme-icons.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dfe044de", Component.options)
  } else {
    hotAPI.reload("data-v-dfe044de", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(26, function() {
			var newContent = __webpack_require__(26);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {};
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper wrapper-scroll wrapper-box wrapper-theme"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "section"
  }, [_c('h2', [_vm._v("图标")]), _vm._v(" "), _c('h3', [_vm._v(".iconfont.icon-*")]), _vm._v(" "), _c('div', [_vm._v("字体图标生成工具："), _c('a', {
    attrs: {
      "href": "http://www.iconfont.cn/",
      "target": "_blank"
    }
  }, [_vm._v("ICONFONT.CN")])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-12 demo-iconfont"
  }, [_c('i', {
    staticClass: "iconfont icon-done"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-delete"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-add"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-right"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-right-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-up"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-up-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-left"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-left-min"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-ok"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-error"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-plus"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-stop"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-info"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-warning"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-circle"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-dot"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-menu"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-list"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-load"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-refresh"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-back"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-search"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-trash"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-lock"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-lock-inverse"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-window"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-window-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-apps"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-layer"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-pc"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-pc-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-switch"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-switch-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-setting"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-setting-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-exit"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-document"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-file"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-file-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-edit"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-folder"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-pic"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-mail"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-link"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-chart"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-chart-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-cart"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-cart-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-money"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-download"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-download-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-upload"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-upload-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-date"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-time"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-location"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-show"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-hide"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-radio"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-radio-hover"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-radio-checked"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-checkbox"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-checkbox-hover"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-checkbox-checked"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-user"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-user-circle"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-user-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-chat"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-phone"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-phone-circle"
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-theme"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-theme-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-like"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-like-inverse"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-good"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-good-circle"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-notice"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-notice-circle"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-rocket"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-light"
  }), _vm._v(" "), _c('br')])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("保留图标")]), _vm._v(" "), _c('div', [_vm._v("你可以使用工具生成自定义的字体图标文件，但是一定要包含以下这些图标样式，以保证UI的正常使用。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid-row"
  }, [_c('div', {
    staticClass: "cell-12-12 demo-iconfont-sys"
  }, [_c('i', {
    staticClass: "iconfont icon-done"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-delete"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-left"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-left-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-right"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-right-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-down-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-up"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-up-min"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-radio"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-radio-hover"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-radio-checked"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-checkbox"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-checkbox-hover"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-checkbox-checked"
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-date"
  }), _vm._v(" "), _c('br')])])])])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-dfe044de", esExports)
  }
}

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_1c6caff7_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(135);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var normalizeComponent = __webpack_require__(5)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_2_vue_loader_lib_template_compiler_index_id_data_v_1c6caff7_hasScoped_false_node_modules_vue_loader_13_0_2_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue\\apps\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(0)
  hotAPI.install(__webpack_require__(1), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c6caff7", Component.options)
  } else {
    hotAPI.reload("data-v-1c6caff7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(27, function() {
			var newContent = __webpack_require__(27);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
    components: {},
    data: function data() {
        return {
            mode: 'HOME',
            userid4modal: '333',
            showdetail: false
        };
    },

    computed: {},
    methods: {
        //收起展开左栏
        // ...mapActions([
        //     'toggle_leftbar'
        // ])
    },
    created: function created() {}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "homepage wrapper wrapper-box"
  }, [_vm._v("\n        welcome to you! " + _vm._s(_vm.mode) + " - qqq23324112222 - " + _vm._s(_vm.showdetail) + " 544 " + _vm._s(_vm.userid4modal) + "\n\t")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(0).rerender("data-v-1c6caff7", esExports)
  }
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(2);

var _vuex2 = _interopRequireDefault(_vuex);

var _mutaionsTypes = __webpack_require__(30);

var _mutaionsTypes2 = _interopRequireDefault(_mutaionsTypes);

var _getter = __webpack_require__(137);

var _getter2 = _interopRequireDefault(_getter);

var _action = __webpack_require__(138);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue2.default.use(_vuex2.default);

var state = {
    data_copy: {},
    data: {
        topbar: {
            show: false
        },
        leftbar: {
            show: false
        },
        leftbarsmall: {
            show: true
        }
    }
};

var mutations = _defineProperty({}, _mutaionsTypes2.default.MERGE_DATA, function (state, newdata) {
    state.data_copy = _vue2.default.api.copy(state.data); //备份，做重置覆盖使用
    state.data = Object.assign(state.data, newdata);
});

exports.default = new _vuex2.default.Store({
    state: state,
    mutations: mutations,
    getters: _getter2.default,
    actions: _action2.default
});

/*
import Vue                  from 'vue';
import Vuex                 from 'vuex';
import * as actions         from './actions';
import * as getters         from './getters';
import cart                 from './modules/cart';
import products             from './modules/products';
import createLogger         from '../../../src/plugins/logger';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
*/

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    topbar: function topbar(state) {
        return state.data.topbar;
    },
    leftbar: function leftbar(state) {
        return state.data.leftbar;
    },
    leftbarsmall: function leftbarsmall(state) {
        return state.data.leftbarsmall;
    }
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mutaionsTypes = __webpack_require__(30);

var _mutaionsTypes2 = _interopRequireDefault(_mutaionsTypes);

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//将native_apps_data的数据结构合并入store
exports.default = {
    marge_data: function marge_data(_ref, $data) {
        var dispatch = _ref.dispatch,
            state = _ref.state;

        dispatch(_mutaionsTypes2.default.MERGE_DATA, $data);
    },

    //展开收起左侧栏
    toggle_leftbar: function toggle_leftbar(_ref2, force) {
        var dispatch = _ref2.dispatch,
            state = _ref2.state;

        if ('undefined' !== typeof force) {
            state.data.leftbar.show = force;
            state.data.leftbarsmall.show = !force;
        } else {
            state.data.leftbar.show = !state.data.leftbar.show;
            state.data.leftbarsmall.show = !state.data.leftbarsmall.show;
        }
    }
};

/***/ })
/******/ ]);