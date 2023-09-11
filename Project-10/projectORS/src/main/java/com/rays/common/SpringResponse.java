package com.rays.common;

import java.util.HashMap;
import java.util.Map;

public class SpringResponse {

	public static String DATA = "data";
	public static String INPUT_ERROR = "inputerror";
	public static String MESSAGE = "message";
	public static String NEXT = "next";

	private boolean succ = false;

	private Map<String, Object> map = new HashMap<String, Object>();

	public boolean isSucc() {
		return succ;
	}

	public void setSucc(boolean succ) {
		this.succ = succ;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public SpringResponse() {
	}

	public SpringResponse(boolean success) {
		this.succ = success;
	}

	public void addResult(String key, Object value) {
		map.put(key, value);
	}

	public void addData(Object value) {
		map.put(DATA, value);
	}

	public void addInputErrors(Object value) {
		map.put(INPUT_ERROR, value);
	}

	public void addMessage(Object value) {
		map.put(MESSAGE, value);
	}

}
